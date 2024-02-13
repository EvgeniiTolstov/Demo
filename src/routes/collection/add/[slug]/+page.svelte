<script>


    let name =''
    let selected = ''
     let uniqCheck = false
    let requiredCheck = false
    let tocollection = ''
    let fromcollection = ''
    let toField = ''
    
    
        export let data;

        let json = data.data
        let options = data.data
        let properties = data.data.properties
    
    
     let unique = ''
     let required = ''
    
     if (data.data.unique){
        unique = data.data.unique
     }
     if (data.data.required){
        required = data.data.required
     }
     
     
    let title = []
    
     async function  handleSubmit() {

         title = [name]
 
    
     var prop =  {[name]: {type:selected}}
            if (selected === "email"){
                prop =  {[name]: {type:"string", format: "email"}}
            }

            if (selected === "file"){
                prop =  {[name]: {type:"string", format: "file"}}
            }


    
        if (uniqCheck == true){
        Array.prototype.push.apply(options.unique, title)
    }else{
        Array.prototype.push.apply(options.unique)// добавит в конец массива options.unique все элементы массива title
    }
    
    
    if (requiredCheck == true){

    Array.prototype.push.apply(options.required, title)// добавит в конец массива options.required все элементы массива title

    }else{
        Array.prototype.push.apply(options.required)

    }

    if (selected === "one-to-one"){
        prop =  {[name]: {type:"string", format: "string", toCollection:tocollection, toField:toField}}
    }

    Object.assign(json.properties, prop); // добавит в конец обьекта json.properties все элементы prop

     let response = await fetch('/manager', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(json)
    })
    
    let result = await response.json()
  
    
    properties = data.data.properties
    
    }
    
    
    </script>
    
    
    <div class="content-section">
      
        <ul>
    {#each Object.entries(properties) as [key, value]}
    
            <li class="adobe-product">
                <div class="products">
                    <svg viewBox="0 0 52 52" style="border:1px solid #3291b8">
                        <g xmlns="http://www.w3.org/2000/svg">
                            <path d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z" fill="#061e26" data-original="#393687" />
                            <path d="M12.16 39H9.28V11h9.64c2.613 0 4.553.813 5.82 2.44 1.266 1.626 1.9 3.76 1.9 6.399 0 .934-.027 1.74-.08 2.42-.054.681-.22 1.534-.5 2.561-.28 1.026-.66 1.866-1.14 2.52-.48.654-1.213 1.227-2.2 1.72-.987.494-2.16.74-3.52.74h-7.04V39zm0-12h6.68c.96 0 1.773-.187 2.44-.56.666-.374 1.153-.773 1.46-1.2.306-.427.546-1.04.72-1.84.173-.801.267-1.4.28-1.801.013-.399.02-.973.02-1.72 0-4.053-1.694-6.08-5.08-6.08h-6.52V27zM29.48 33.92l2.8-.12c.106.987.6 1.754 1.48 2.3.88.547 1.893.82 3.04.82s2.14-.26 2.98-.78c.84-.52 1.26-1.266 1.26-2.239s-.36-1.747-1.08-2.32c-.72-.573-1.6-1.026-2.64-1.36-1.04-.333-2.086-.686-3.14-1.06a7.36 7.36 0 01-2.78-1.76c-.987-.934-1.48-2.073-1.48-3.42s.54-2.601 1.62-3.761 2.833-1.739 5.26-1.739c.854 0 1.653.1 2.4.3.746.2 1.28.394 1.6.58l.48.279-.92 2.521c-.854-.666-1.974-1-3.36-1-1.387 0-2.42.26-3.1.78-.68.52-1.02 1.18-1.02 1.979 0 .88.426 1.574 1.28 2.08.853.507 1.813.934 2.88 1.28 1.066.347 2.126.733 3.18 1.16 1.053.427 1.946 1.094 2.68 2s1.1 2.106 1.1 3.6c0 1.494-.6 2.794-1.8 3.9-1.2 1.106-2.954 1.66-5.26 1.66-2.307 0-4.114-.547-5.42-1.64-1.307-1.093-1.987-2.44-2.04-4.04z" fill="#c1dbe6" data-original="#89d3ff" />
                        </g>
                    </svg>
                    {key}
                </div>
                    <span class="status">
                    <span class="status-circle green"></span>
                    {value.type}</span>
                    <span class="status">
                    <span class="status-circle green"></span>
                    {value.maxLength}</span>
                    <span class="status">
                        <span class="status-circle green"></span>
                        unique - {unique.includes(key)}</span>
                        <span class="status">
                            <span class="status-circle green"></span>
                            required - {required.includes(key)}</span>
                    <div class="button-wrapper">
                    <button class="content-button status-button open">Open</button>
                    <div class="menu">
                        <button class="dropdown">
                            <ul>
                                <li><a href="#">Go to Discover</a></li>
                                <li><a href="#">Learn more</a></li>
                                <li><a href="#">Uninstall</a></li>
                            </ul>
                        </button>
                    </div>
                </div>
            </li>
            
    
    
    {/each}
    </ul>
    </div>
    
    Тип поля 
    <form  on:submit|preventDefault={handleSubmit} >
        <select required bind:value={selected}   name="somename" class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" >
        <option disabled value="" >Type</option>
        <option value="string">String</option>
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="date-time">Date-time</option>
        <option value="boolean">Boolean</option>
        <option value="file">File</option>
        <option value="object">Object</option>
        <option value="array">Array</option>
        <option value="json">JSON</option>
        <option value="one-to-one">One to one</option>
        </select>
Наименование поля в БД

        <div class="form-group mb-6">
            <input  bind:value={name}  type="text" class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
                   placeholder="Name">
        </div>
   
     

        {#if selected && selected !== 'Type' && selected !== 'one-to-one'}
        {selected} {name}
        <div class="form-group form-check text-center mb-6">
            <input  type=checkbox bind:checked={uniqCheck}
                   class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                   id="exampleCheck87" >
            <label class="form-check-label inline-block text-gray-800" for="exampleCheck87">Уникальное поле</label>
        </div>
    
        <div class="form-group form-check text-center mb-6">
            <input  type=checkbox bind:checked={requiredCheck}
                   class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                   id="exampleCheck88" >
            <label class="form-check-label inline-block text-gray-800" for="exampleCheck88">Обязательное</label>
        </div>
        {/if}
        {#if selected === 'one-to-one'}
        <div class="form-group mb-6">
            <input  type="text" bind:value={tocollection} class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="toCollection"
                   placeholder="Связь с другой коллекцией">

            <input type="text" bind:value={toField} class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="toField"
                   placeholder="Поле в связанной коллекции">


        </div>
        {/if}

    
        <div class="form-group mb-6">
      <textarea 
              class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="exampleFormControlTextarea13"
              rows="3"
              placeholder="Сообщение пока не работает"
      ></textarea>
        </div>
      
        <button  type="submit" class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"  >Send</button>
    </form>