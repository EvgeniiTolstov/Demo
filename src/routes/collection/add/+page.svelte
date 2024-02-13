<script>
// @ts-nocheck

     import {goto} from "$app/navigation"
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()
    //let model = 'cms_collection'

    let title
    let slug
    let error
      async function newCollection(e){
          e.preventDefault()

          error=undefined
          try {
          
              const res =     await fetch('/manager',{
                  method:'POST',
                  body: JSON.stringify({
                      model:slug,
                      required :[],
                      unique :[],
                      properties:{

                      }

                  }),
                  headers:{
                      'Content-Type':'application/json'
                  }

              })
              
              const idTable = await res.json()
              console.log('idTable',res)

              if(!idTable.body){
                  goto('/collection/add/'+slug)
                  dispatch('success')
              }else {
                  error= idTable.body
              }
          }catch (err){

              error = 'An error occurred'
          }

    }
</script>

{#if (error)}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">{error}</strong>

        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
  </span>
    </div>

{/if}

<div class="block p-6 rounded-lg shadow-lg bg-white max-w-md">
    <form >
        <div class="form-group mb-6">
            <input bind:value={title}  type="text" class="form-control block
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
        <div class="form-group mb-6">
            <input bind:value={slug}  type="text" class="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput66"
                   placeholder="slug">
        </div>


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
              placeholder="Message"
      ></textarea>
        </div>
        <div class="form-group form-check text-center mb-6">
            <input type="checkbox"
                   class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                   id="exampleCheck87" checked>
            <label class="form-check-label inline-block text-gray-800" for="exampleCheck87">Send me a copy of this message</label>
        </div>
        <button type="submit" class="
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
      ease-in-out" on:click={newCollection} >Send</button>
    </form>
</div>