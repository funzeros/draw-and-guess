<script lang="ts">
  import { fabric } from "fabric";
  import { onMount } from "svelte";
  const enum EVENT_POOL {
    MOUSE_DOWN = "mouse:down",
    OBJECT_ADDED = "object:added",
    AFTER_RENDER = "after:render",
  }
  let color = "#000000";
  let width = 5;
  let canvas: fabric.Canvas;
  let isRedoing = false;
  let stateArr = [];
  const handleChangeColor = () => (canvas.freeDrawingBrush.color = color);
  const handleChangeWidth = () => (canvas.freeDrawingBrush.width = width);
  const handleClear = () => canvas.clear();
  const undoDraw = () => {
    if (canvas._objects.length > 0) {
      stateArr.push(canvas._objects.pop());
      canvas.renderAll();
    }
  };
  const redoDraw = () => {
    if (stateArr.length > 0) {
      isRedoing = true;
      canvas.add(stateArr.pop());
      canvas.renderAll();
    }
  };
  const initCanvas = () => {
    canvas = new fabric.Canvas("canvas");
    canvas.isDrawingMode = true;
    canvas.backgroundColor = "#ffffff";
    canvas.clear();
    canvas.on(EVENT_POOL.OBJECT_ADDED, () => {
      if (!isRedoing) stateArr = [];
      else isRedoing = false;
    });
    handleChangeColor();
    handleChangeWidth();
  };
  const exportCanvas = () => {
    const dataURL = canvas.toDataURL({
      width: canvas.width,
      height: canvas.height,
      left: 0,
      top: 0,
      format: "png",
    });
    console.log(dataURL);
  };
  onMount(() => {
    initCanvas();
  });
</script>

<section class="draw-wrap">
  <canvas width="1000" height="600" id="canvas" />
  <div class="tools">
    <button on:click={exportCanvas}>导出</button>
    <button on:click={undoDraw}>撤销</button>
    <button on:click={redoDraw}>重做</button>
    <button on:click={handleClear}>清空画布</button>
    <span>画笔颜色</span><input
      type="color"
      bind:value={color}
      on:input={handleChangeColor}
    />
    <span>画笔粗细</span>
    <input
      type="range"
      bind:value={width}
      min="1"
      max="100"
      step="1"
      on:input={handleChangeWidth}
    />
    <input
      type="number"
      bind:value={width}
      min="1"
      max="100"
      step="1"
      on:input={handleChangeWidth}
    />
  </div>
</section>

<style>
  .draw-wrap {
    position: absolute;
    width: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .tools {
    position: absolute;
    top: -30px;
    right: 0;
  }
  .tools input {
    vertical-align: middle;
  }
  .tools span {
    margin-left: 10px;
  }
  .tools span::after {
    content: "：";
  }
  #canvas {
    box-shadow: 0 0 0 1px #000;
  }
</style>
