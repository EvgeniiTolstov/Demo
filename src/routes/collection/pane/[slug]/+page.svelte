<script>
  import Leftbar from "$lib/Leftbar.svelte"
	import { Pane, Splitpanes } from 'svelte-splitpanes';
    import { json } from "@sveltejs/kit";
	import { bind, empty } from "svelte/internal";
    let fontSize = 12;
  import { goto } from '$app/navigation';
  let files;
    let nemes = ''
    let result = false
    export let data;
    console.log('data', data)
   // export let attributes
     let obj =  JSON.parse(data.data);
     let obj2 = JSON.parse(data.attributes);
     let slug = data.slug;
     let count = obj.count;
     let total = data.meta.total;
     let offset = data.meta.offset;
     let limit = data.meta.limit;
     let ontrue = false;
     $: prodct = JSON.parse(data.rowdata);
     

   
   
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

async function openRow(id) {
  let url = `?id=${id}`;
    goto(url);
}

async function dblclick(id) {
 alert(id);
  
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

<Splitpanes style="height: 700px" pushOtherPanes={false}>
	<Pane size={10}>
       <Leftbar/>
    </Pane>
    	<Pane size={70}>
             <div class="wrapstable1">
                <table class="table">
                    <thead>
                        <tr >
                          <th  style="font-size:{fontSize}px;" >ID</th>
                      {#each  Object.keys(type) as column}
                      <th style="font-size:{fontSize}px;">{column}</th>
                      {/each}
                      <th> </th>
                  </tr>
                  </thead>
                    <tbody>
                        {#each rows as row}

                        <tr on:click={() => openRow(row.id)} on:dblclick={() => dblclick(row.id)} >
                          <td data-label='{row.id}' style="font-size:{fontSize}px;">{row.id}</td>
                            {#each  Object.keys(type) as column}
                            
                            <td style="font-size:{fontSize}px;" data-label='{row[column]}'>{row[column]}</td>
                            {/each}
                            <td style="font-size:{fontSize}px;">
                              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => deleteRow(row.id)}>Delete</button>
                        </tr>
                        {/each}
                    </tbody>
                </table>
        </div>
    </Pane>
	<Pane  snapSize={20}>
		<Splitpanes horizontal={true}>
			<Pane >
                <div class="wrapstable">
                    {#each  Object.keys(type) as column}
                    <table class="table">    
                       <tr>
                         <td style="width: 150px;">{column}</td>
                         <td><input type="text" id="{column}" name="{column}" value="{prodct[column]}" readonly /></td>
                         </tr>
                         </table>
                         {/each}

                </div>
            </Pane>
			<Pane >
                <div class="wrapstable">
                    {#each  Object.keys(type) as column}
                    <table class="table">    
                       <tr>
                         <td style="width: 200px;">{column}</td>
                         <td>{prodct[column]}</td>
                         </tr>
                         </table>
                         {/each}

                </div>
            </Pane>
			<Pane>4</Pane>
		</Splitpanes>
	</Pane>

</Splitpanes>
<style>
table {
  table-layout: fixed;
  width: 100%;
}
table td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wrapstable {
  overflow-x: scroll;
  width: 100%;
  height: 100%;
}
.wrapstable1 {
  overflow-x: scroll;
  width: 100%;
  height: 100%;
}


</style>