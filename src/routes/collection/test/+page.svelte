<script>
    import { onMount, onDestroy } from 'svelte';
    let separator;
    let separator2;
    export let updateCallback = () => {
        // do nothing
        return;
    }
    export let onMouseDown = () => {
        // do nothing
        return;
    }
    export let onMouseUp = () => {
        // do nothing
        return;
    }
    let md;
    const onMouseDownWrapper = (e) => {
        e.preventDefault();
        onMouseDown();
        if (e.button !== 0) return;
        md = {e,
            offsetLeft:  separator.offsetLeft,
            offsetTop:   separator.offsetTop,
            firstWidth:  left.offsetWidth,
            secondWidth: right.offsetWidth,
        
        
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUpWrapper);
        window.addEventListener('touchmove', onMouseMove);
        window.addEventListener('touchend', onMouseUpWrapper);
    }

    const onMouseDownWrapper2 = (e) => {
        e.preventDefault();
        onMouseDown();
        if (e.button !== 0) return;
        md = {e,
            offsetLeft:  separator2.offsetLeft,
            offsetTop:   separator2.offsetTop,

        
          
            firstHeight:  top.offsetHeight,
            secondHeight: down.offsetHeight
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUpWrapper);
        window.addEventListener('touchmove', onMouseMove);
        window.addEventListener('touchend', onMouseUpWrapper);
    }


    const onMouseMove = (e) => {
        e.preventDefault();
        if (e.button !== 0) return;
        var delta = {x: e.clientX - md.e.clientX,
                y: e.clientY - md.e.clientY};
        // Prevent negative-sized elements
        delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
                    md.secondWidth);
        delta.y = Math.min(Math.max(delta.y, -md.firstHeight),
        md.secondHeight);
        separator.style.left = md.offsetLeft + delta.x + "px";
        left.style.width = (md.firstWidth + delta.x) + "px";
        right.style.width = (md.secondWidth - delta.x) + "px";
        top.style.height = (md.firstHeight + delta.y) + "px";
        down.style.height = (md.secondHeight - delta.y) + "px";
        updateCallback();
    }
    const onMouseUpWrapper = (e) => {
        onMouseUp();
        if (e) {
            e.preventDefault();
            if (e.button !== 0) return;
        }
        updateCallback();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUpWrapper);
        window.removeEventListener('touchmove', onMouseMove);
        window.removeEventListener('touchend', onMouseUpWrapper);
    }
    function resetSize() {
        if (left) left.removeAttribute('style');
        if (right) right.removeAttribute('style');
        if (top) top.removeAttribute('style');
        if (down) down.removeAttribute('style');
        if (separator) separator.removeAttribute('style');
    }
  

    let left, right;
    let top, down;
     let leftPaneSize = '50%';
     let rightPaneSize = '50%';
     let minLeftPaneSize = '25%';
     let minRightPaneSize = '25%';
    $: leftPaneSize && resetSize();
    $: rightPaneSize && resetSize();
     let topPanelSize = '50%';
     let downPanelSize = '50%';
     let minTopPaneSize = '25%';
     let minDownPaneSize = '25%';
    $: topPanelSize && resetSize();
    $: downPanelSize && resetSize();
</script>



    <div class="content-wrapper">
<div class="wrapper" style="--left-panel-size: {leftPaneSize}; --right-panel-size: {rightPaneSize}; --min-left-panel-size: {minLeftPaneSize}; --min-right-panel-size: {minRightPaneSize};">
    <div bind:this={left} class="left">
        <div id="left">
            <div >
                <div class="tablewrapper">
                   
                      <div class="wrapper2">
                        <div class="div2">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>ZIP</th>
                                        <th>Birthday</th>
                                        <th>Points</th>
                                        <th>Average</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gloria  Gloria Gloriaa</td>
                                        <td>Reeves</td>
                                        <td>67439</td>
                                        <td>10/18/1985</td>
                                        <td>4</td>
                                        <td>0.1</td>
                                        <td>$50</td>
                                    </tr>
                                    <tr>
                                        <td>Graham</td>
                                        <td>Bonner</td>
                                        <td>90727</td>
                                        <td>12/07/1983</td>
                                        <td>4</td>
                                        <td>0.9</td>
                                        <td>$90</td>
                                    </tr>
                                    <tr>
                                        <td>Warren</td>
                                        <td>Wheeler</td>
                                        <td>99134</td>
                                        <td>11/11/1984</td>
                                        <td>2</td>
                                        <td>0.7</td>
                                        <td>$50</td>
                                    </tr>
                                    <tr>
                                        <td>Zena</td>
                                        <td>Hale</td>
                                        <td>19803</td>
                                        <td>06/17/1987</td>
                                        <td>9</td>
                                        <td>0.3</td>
                                        <td>$90</td>
                                    </tr>
                                    <tr>
                                        <td>Julia</td>
                                        <td>Haupt</td>
                                        <td>24116</td>
                                        <td>03/15/1991</td>
                                        <td>10</td>
                                        <td>1.0</td>
                                        <td>$40</td>
                                    </tr>
                                    <tr>
                                        <td>Rachel</td>
                                        <td>English</td>
                                        <td>58951</td>
                                        <td>02/25/1982</td>
                                        <td>7</td>
                                        <td>0.3</td>
                                        <td>$20</td>
                                    </tr>
                                    <tr>
                                        <td>Lionel</td>
                                        <td>Barry</td>
                                        <td>65036</td>
                                        <td>02/17/1980</td>
                                        <td>7</td>
                                        <td>0.5</td>
                                        <td>$50</td>
                                    </tr>
                                    <tr>
                                        <td>Zena</td>
                                        <td>Spears</td>
                                        <td>16874</td>
                                        <td>12/13/1981</td>
                                        <td>5</td>
                                        <td>0.6</td>
                                        <td>$20</td>
                                    </tr>
                                    <tr>
                                        <td>Dillon</td>
                                        <td>Bradford</td>
                                        <td>91543</td>
                                        <td>01/20/1985</td>
                                        <td>7</td>
                                        <td>0.4</td>
                                        <td>$100</td>
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                        <td>04/12/1980</td>
                                        <td>4</td>
                                        <td>0.1</td>
                                        <td>$20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    </div>
  
    <div bind:this={separator} class="separator" on:mousedown={onMouseDownWrapper} on:touchstart={onMouseDownWrapper}>
    </div>
    
    <div bind:this={right} class="right"  style="background-color: red;">
        <div id="right" >
            <div class="wrappertop" style="--top-panel-size: {topPanelSize}; --down-panel-size: {downPanelSize}; --min-top-panel-size:{minTopPaneSize}; --min-down-panel-size: {minDownPaneSize};">
                <div bind:this={top} class="top" >
                    <div id="top"  style="background-color: red;">
                        <div style="background-color: red;">
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                            Top Contents goes here...<br>
                        </div>
                    </div>
                </div>
                <div bind:this={separator2} class="separator2" on:mousedown={onMouseDownWrapper2} on:touchstart={onMouseDownWrapper2}>
                </div>
                <div bind:this={down} class="down">
                    <div id="down">
                        <div style="background-color: yellow;">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>ZIP</th>
                                     
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gloria  Gloria Gloriaa</td>
                                        <td>Reeves</td>
                                        <td>67439</td>
                                     
                                    </tr>
                                    <tr>
                                        <td>Graham</td>
                                        <td>Bonner</td>
                                        <td>90727</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Warren</td>
                                        <td>Wheeler</td>
                                        <td>99134</td>
                                     
                                    </tr>
                                    <tr>
                                        <td>Zena</td>
                                        <td>Hale</td>
                                        <td>19803</td>
                                   
                                    </tr>
                                    <tr>
                                        <td>Julia</td>
                                        <td>Haupt</td>
                                        <td>24116</td>
                                  
                                    </tr>
                                    <tr>
                                        <td>Rachel</td>
                                        <td>English</td>
                                        <td>58951</td>
                                     
                                    </tr>
                                    <tr>
                                        <td>Lionel</td>
                                        <td>Barry</td>
                                        <td>65036</td>
                                  
                                    </tr>
                                    <tr>
                                        <td>Zena</td>
                                        <td>Spears</td>
                                        <td>16874</td>
                                     
                                    </tr>
                                    <tr>
                                        <td>Dillon</td>
                                        <td>Bradford</td>
                                        <td>91543</td>
                                   
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                    <tr>
                                        <td>Haley</td>
                                        <td>Mcleod</td>
                                        <td>99321</td>
                                      
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<style>
  
  
    .wrappertop {
        width: 100%;
        height: 100%;
        /* background-color: yellow; */
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .separator {
        cursor: col-resize;
        height: 100%;
        width: 4px;
        margin-left: -2px;
        z-index: 1;
        background-color: #918a8a;

        background-repeat: no-repeat;
        background-position: center;
    }
    .separator2 {
        cursor: row-resize;
        width: 100%;
        height: 4px;
        margin-top: -2px;
        z-index: 1;
        background-color: #1ec626;
    }
    .left {
        width: var(--left-panel-size);
        min-width: var(--min-left-panel-size);
        height: 100%;
    }
    .right {
        width: var(--right-panel-size);
        min-width: var(--min-right-panel-size);
        height: 100%;
        overflow: hidden;
        
    }

    .top {
        height: var(--top-panel-size);
        min-height: var(--min-top-panel-size);
        width: 100%;
        max-height: 50%;
     
        /* отступ с низу 20% */
      
         overflow: auto;
        



    }
    #top {
        overflow-x: scroll;
        overflow-y: scroll;
    }
    .down {
        height: var(--down-panel-size);
        min-height: var(--min-down-panel-size);
        width: 100%;
        overflow: auto !important;

    }
    #down {
        overflow-x: scroll;
        overflow-y: scroll;
    }
    .down {
        height: var(--down-panel-size);
        min-height: var(--min-down-panel-size);
        width: 100%;
        height: auto;
     
    }
    .wrapper1, .wrapper2 {  overflow-x: scroll; overflow-y: hidden; }
.wrapper1 { height: 50%; }
.wrapper2 { height: 30%;  }
.div1 { height: 20px; }
.div2 { overflow: none; }
.table {
	width: 100%;
	margin-bottom: 20px;
	border-collapse: collapse; 
 
}
.table th {
	font-weight: bold;
	padding: 5px;
	background: #f5f380;
	border: 1px solid #dddddd;
    color : #000000 !important;
    left: 0;
}



.table td {
	border: 1px solid #dddddd;
	padding: 5px;
}
 
.table td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


.table tr td:first-child, .table tr th:first-child {
	border-left: none;
}
.table tr td:last-child, .table tr th:last-child {
	border-right: none;
}
</style>