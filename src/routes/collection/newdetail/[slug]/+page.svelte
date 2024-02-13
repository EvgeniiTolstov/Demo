<script>
  import Leftbar from "$lib/Leftbar.svelte";
  import { goto } from "$app/navigation";
  import { Pane, Splitpanes } from "svelte-splitpanes";
  let files;
  let nemes = "";
  let result = false;
  export let data;
  export let  form;

  // export let attributes
  let obj = JSON.parse(data.data);
  let obj2 = JSON.parse(data.attributes);
  let slug = data.slug;
  let count = obj.count;
  let total = data.meta.total;
  let offset = data.meta.offset;
  let limit = data.meta.limit;
  let ontrue = false;
  let fontSize = 12;

  $: prodct = JSON.parse(data.rowdata);

  let numrow = 1;
  let rows = obj.rows;
  // получить ключи obj2 и сделать из них массив
  let columns = Object.keys(obj2.properties);
  let type = obj2.properties;
  let required = false;


  async function handleSubmit(event) {
    // console.log('rows', rows)
    console.log("type", event.target);
    event.preventDefault();

    let prop = [];
    for (let key in type) {
      if (type[key].type === "text" && event.target[key].value) {
        prop.push({ [event.target[key].id]: event.target[key].value });
      }

      if (type[key].type === "string" && event.target[key].value) {
        prop.push({ [event.target[key].id]: event.target[key].value });
      }
      if (type[key].type === "number" && event.target[key].value) {
        prop.push({ [event.target[key].id]: event.target[key].value });
      }
      if (type[key].type === "boolean" && event.target[key].value) {
        if (event.target[key].value == "true") {
          console.log("value", event.target[key].value);
          prop.push({ [event.target[key].id]: true });
        } else {
          prop.push({ [event.target[key].id]: false });
        }
      }
      if (type[key].type === "date" && event.target[key].value) {
        prop.push({ [event.target[key].id]: event.target[key].value });
      }
      //integer
      if (type[key].type === "integer" && event.target[key].value) {
        prop.push({ [event.target[key].id]: event.target[key].value });
      }
      if (type[key].type === "date-time" && event.target[key].value) {
        prop.push({ [event.target[key].id]: event.target[key].value });
      }
      if (type[key].type === "object" && event.target[key].value) {
        //преобразовать в объект
        let object = JSON.parse(event.target[key].value);
        prop.push({ [event.target[key].id]: object });
      }
      if (type[key].type === "array" && event.target[key].value) {
        console.log("Array", event.target[key].value);
        prop.push({ [event.target[key].id]: event.target[key].value });
      }
      if (type[key].type === "json" && event.target[key].value) {
        console.log("json", event.target[key].value);
        let object = JSON.parse(event.target[key].value);
        prop.push({ [event.target[key].id]: object });
      }
      //email
      if (type[key].format === "email" && event.target[key].value) {
        prop.push({ [event.target[key].id]: event.target[key].value });
      }
      //file
      if (type[key].format === "file" && event.target[key].value) {
        let filename = event.target[key].value.split("\\").pop();
        prop.push({ [event.target[key].id]: filename });
      }
    }


    let model = slug;
    const object = Object.assign({}, ...prop);


    let body = {
      model: model,
      properties: object,
    };


    let save = await fetch(`/manager/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    type = obj2.properties;
    rows = obj.rows;
    columns = Object.keys(obj2.properties);

  }
  

  $: if (files) {
    for (const file of files) {
      async function upload() {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("model", slug);
        const response = await fetch("/manager/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const json = await response.json();
          console.log(json);
        } else {
          alert("HTTP-Error: " + response.status);
        }
      }
      upload();
    }
  }
  async function deleteRow(id) {
    let model = slug;
    let body = {
      model: model,
      id: id,
    };

    async function openRow(id) {
      let url = `?id=${id}`;
      goto(url);
    }

    let save = await fetch(`/api/v1/${model}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(save);
    type = obj2.properties;
    rows = obj.rows;
    columns = Object.keys(obj2.properties);
    //перезагрузить страницу
    location.reload();
  }
  async function openRow(id) {
    let url = `?id=${id}`;
    goto(url);
  }

  async function dblclick(id) {
    alert(id);
  }
  console.log("type", type);
</script>

<Splitpanes style="height: 700px" pushOtherPanes={false}>
  <Pane size={10}>
    <Leftbar />
  </Pane>
  <Pane size={70}>

    <div  class="big-table ">
      
      <div class="scroll-table">
        <div class="scroll-table-body">
      <table >
      
        <thead >
          <tr>
            <th> №</th>
            <th style="font-size:{fontSize}px;">ID</th>
            {#each Object.keys(type) as column}
              <th style="font-size:{fontSize}px;">{column}</th>
            {/each}
            <th />
          </tr>
        </thead>
      
     
        <tbody >
          {#each rows as row, idx}
            <tr
              on:click={() => openRow(row.id)}
              on:dblclick={() => dblclick(row.id)}
            >
              <td>{idx + 1}</td>
              <td data-label={row.id} style="font-size:{fontSize}px;"
                >{row.id}</td
              >
              {#each Object.keys(type) as column}
                <td style="font-size:{fontSize}px;" data-label={row[column]}
                  >{row[column]}</td
                >
              {/each}
              <td style="font-size:{fontSize}px;">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  on:click={() => deleteRow(row.id)}>Delete</button
                >
              </td></tr
            >
          {/each}
        </tbody>
    
      
      </table>
    </div>
    </div>
    </div>
 
  </Pane>
  <Pane snapSize={20}>
    <Splitpanes horizontal={true}>
      <Pane>
        <div class="wrapstable">
          <form method= "POST" action="" >
          <table class="table">
            <tr>
              <td style="width: 150px;">ID</td>
              <td
                ><input
                  type="text"
                  id="id"
                  name="id"
                  value={prodct.id}
                  readonly
                /></td
              >
            </tr>
            {#each Object.keys(type) as column}
              <tr>
                <td style="width: 150px;">{column}</td>
                <td
                  ><input
                    type="text"
                    id={column}
                    name={column}
                    value={prodct[column]}
                    
                  /></td
                >
              </tr>
            {/each}
          </table>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >SAVE</button>
          </form>
        </div>
      
      </Pane>
      <Pane>
        <div class="wrapstable" />
      </Pane>
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

  .big-table {
	overflow: auto;
	position: relative;
}
.big-table table {
	display: inline-block;
	vertical-align: top;
	max-width: 1200px;
	overflow-x: auto;
	white-space: nowrap;
	-webkit-overflow-scrolling: touch;
}

.scroll-table-body {
	height: 700px;
	overflow-x: auto;
	margin-top: 0px;
	margin-bottom: 20px;
	border-bottom: 1px solid #eee;
}
.scroll-table thead {
  max-width: 1200px;
	table-layout: fixed;
	border: none;
}
.scroll-table thead th {
	font-weight: bold;
	text-align: left;
	border: none;
	padding: 10px 15px;
	background: #d8d8d8;
	font-size: 14px;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
}
.scroll-table tbody td {
	text-align: left;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
	padding: 10px 15px;
	font-size: 14px;
	vertical-align: top;
}
.scroll-table tbody tr:nth-child(even){
	background: #f3f3f3;
}
 
/* Стили для скролла */
::-webkit-scrollbar {
	width: 6px;
} 
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
} 
::-webkit-scrollbar-thumb {
	box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}


</style>
