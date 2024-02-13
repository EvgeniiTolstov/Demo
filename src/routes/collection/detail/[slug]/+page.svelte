<script>
	import { json } from "@sveltejs/kit";
	import { bind, empty } from "svelte/internal";
  let files;
    let nemes = ''
    let result = false
    export let data;
   // export let attributes
     let obj =  JSON.parse(data.data);
     let obj2 = JSON.parse(data.attributes);
     let slug = data.slug;
     let count = obj.count;
     let total = data.meta.total;
     let offset = data.meta.offset;
     let limit = data.meta.limit;
     let ontrue = false;
     
console.log('obj', obj)
   
   
     //let obj3 = JSON.parse(data.type);
    // console.log('type++#############', obj2.properties)
     let rows = obj.rows;
   // получить ключи obj2 и сделать из них массив
     let columns = Object.keys(obj2.properties);
     let type = obj2.properties;

  //   console.log('type++#############', obj2)
    
   async  function handleSubmit(event) {
      // console.log('rows', rows)
  console.log('type', event.target)
        event.preventDefault();

      let prop = [];
        for (let key in type ) {
         
          if ( type[key].type === 'text' && event.target[key].value ) {
            prop.push({[event.target[key].id]: event.target[key].value})
            }

          if ( type[key].type === 'string' && event.target[key].value ) {
             prop.push({[event.target[key].id]: event.target[key].value})
          }
          if(type[key].type === 'number' && event.target[key].value ) {
            prop.push({[event.target[key].id]: event.target[key].value})
          }
          if(type[key].type === 'boolean' && event.target[key].value ) {
        
            if (event.target[key].value == 'true'){
              console.log('value', event.target[key].value)
              prop.push({[event.target[key].id]: true})
          
              } else {
                prop.push({[event.target[key].id]: false})
              }
          }
          if(type[key].type === 'date' && event.target[key].value ) {
            prop.push({[event.target[key].id]: event.target[key].value})
          }
          //integer
          if(type[key].type === 'integer' && event.target[key].value ) {
            prop.push({[event.target[key].id]: event.target[key].value})
          }
          if(type[key].type === 'date-time' && event.target[key].value ) {
            prop.push({[event.target[key].id]: event.target[key].value})
          }
           if(type[key].type === 'object' && event.target[key].value ) {
            //преобразовать в объект
            let object = JSON.parse(event.target[key].value);
            prop.push({[event.target[key].id]: object})
           }
            if(type[key].type === 'array' && event.target[key].value ) {
              //преобразовать в массив
              let arr = JSON.parse(event.target[key].value);
              prop.push({[event.target[key].id]: arr})
            }
            //email
            if(type[key].format === 'email' && event.target[key].value ) {
              prop.push({[event.target[key].id]: event.target[key].value})
            }
            //file
            if(type[key].format === 'file' && event.target[key].value ) {
              let filename = event.target[key].value.split('\\').pop();
              prop.push({[event.target[key].id]: filename})
            }
                                     
        }

       

      //  console.log(JSON.stringify(prop))
        let model = slug;
        const object = Object.assign({}, ...prop);
        //собрать все значения из формы в один объект
     
        let body = {
          model: model,
          properties: object
        }
        
     //  console.log("object", body);
       let save = await fetch(`/manager/detail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        
        type = obj2.properties;
        rows = obj.rows;
        columns = Object.keys(obj2.properties);
      // console.log(save);
     }
    

$: if (files) {
  // Note that `files` is of type `FileList`, not an Array:
  // https://developer.mozilla.org/en-US/docs/Web/API/FileList


  for (const file of files) {
    async function upload() {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('model', slug);
      const response = await fetch('/manager/upload', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json);
      } else {
        alert('HTTP-Error: ' + response.status);
      }
    }
    upload();
   
  }
}
async function deleteRow(id) {
  let model = slug;
  let body = {
    model: model,
    id: id
  }
  let save = await fetch(`/api/v1/${model}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  console.log(save);
  type = obj2.properties;
  rows = obj.rows;
  columns = Object.keys(obj2.properties);
  //перезагрузить страницу
  location.reload();
}

</script>

<!-- {#if result}
<div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p class="font-bold">Informational message</p>
  <p class="text-sm">{result.data}</p>
</div>
{/if} -->

<div class="w-1/2" >
<div class="table-wrap">
 <div>Count - {count}, Total - {total}, Offset {offset},Limit - {limit}</div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
    {#each  Object.keys(type) as column}
    <th>{column}</th>
    {/each}
    <th> </th>
</tr>
</thead>
<tbody>
{#each rows as row}

<tr>
  <td data-label='{row.id}'>{row.id}</td>
    {#each  Object.keys(type) as column}
    
    <td data-label='{row[column]}'>{row[column]}</td>
    {/each}
    <td>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => deleteRow(row.id)}>Delete</button>
</tr>
{/each}
</tbody>
</table>
</div>


</div>

<div class="w-1/2">
<form  on:submit|preventDefault={handleSubmit} >
{#each   Object.entries(obj2.properties) as [key, value] }

<br>
        {value.type} - {key} - {obj2.required} - {obj2.unique} - {value.format}
         {#if value.type == 'boolean'}
            <input 
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="checkbox" id={key} 
            name={key}
    
            bind:checked={value.default}    
            value={value.default}  
              />
     

        {:else if value.type == 'string' && !value.format}
        {#if key == obj2.required} required {/if} - {#if key == obj2.unique} unique {/if}
            <input 
            required = {key == obj2.required}
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text" id={key} value=""  />

        {:else if value.format == 'date-time'}
            <input 
        
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
             type="datetime-local" id={key}  name={key} value={value.default}>

            {:else if value.type == 'date'}
            <input 
        
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="date" 
            id={key} 
            name={key} value={value.default}>

            {:else if value.type == 'date-time'}
            <input 
        
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="datetime-local" 
            id={key}  
            name={key} value={value.default}>
        {:else if value.type == 'integer'}
            <input 
           
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="number" id={key} >
        {:else if value.type == 'number'}
            <input 
           
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="number" id={key} >
            {:else if value.format === 'email'}  
            <input 
            required = {key == obj2.required}
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="email" id={key} value=""  />
        {:else if value.type == 'string' && value.format == 'password'}
            <input
            required = {key == obj2.required}
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="password" id={key} value=""  />
        {:else if value.type == 'string' && value.format == 'file'}
            <input
            bind:files={files}
            required = {key == obj2.required}
            multiple
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file" id={key} value=""  />
            {#if files}
	<h2>Selected files:</h2>
	{#each Array.from(files) as file}
		<p>{file.name} ({file.size} bytes) </p>
	{/each}
{/if}
        {:else if value.type == 'string' && value.format == 'image'}
            <input
            required = {key == obj2.required}
            bind:files={files}
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file" id={key} value=""  />
        {:else if value.type == 'string' && value.format == 'url'}
            <input
            required = {key == obj2.required}
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="url" id={key} value=""  />
            {:else}
            <input 
            required = {key == obj2.required}
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text" id={key} value=""  />
        {/if}
     
        {#if value.type == 'array'}
            {#each value.photo as item}
                {item} <br>
            {/each}
        {/if}

     
{/each}
<button type="submit" class="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Send</button>
</form>
</div>



<style>

  .table-wrap {
    overflow-x: auto;
  }



  .table-wrap {
    text-align: center;
    display: inline-block;
  background-color: #fff;

  color: #000;
}
 
 table {
    border: 1px solid #ccc;
    width: 100%;
    margin:0;
    padding:0;
    border-collapse: collapse;
    border-spacing: 0;
  }
 
  table tr {
    border: 1px solid #ddd;
    padding: 5px;
  }
 
  table th, table td {
    
    text-align: center;
    border-right: 1px solid #ddd;
  }
 
  table th {
    color: #fff;
    background-color: #444;
   
    font-size: 14px;
    letter-spacing: 1px;
  }


@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table thead {
    display: none;
  }
  table tr {
    margin-bottom: 10px;
    display: block;
    border-bottom: 2px solid #ddd;
  }
  table td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ccc;
    border-right: 1px solid transparent;
  }
  table td:last-child {
    border-bottom: 0;
  }
  table td:before {
    content: attr(data-label);
    float: left;
    
    font-weight: bold;
  }
}
</style>