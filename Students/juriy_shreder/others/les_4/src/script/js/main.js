class Text {
    constructor(container='.buy-btn'){
        this.container = container
        this.correct_text =''
        this._init();
    }
    _init(){
      document.querySelector(this.container).addEventListener('click', event => {this._read();})
    }
    _read(){
      let file = document.getElementById('file').files[0]
      let reader = new FileReader();
      reader.readAsText(file)
      reader.onload = function () {
      this.correct_text = reader.result.replace(/\n/g," <br>");
      document.getElementById('in').innerHTML = this.correct_text
      this.correct_text = this.correct_text.replace(/(?<=\s)'|'(?=\s)|'$/g, "\"")
      document.getElementById('out').innerHTML = this.correct_text      
      };   
    }
}

export default ()=>{
  let itm = new Text;
}
