var EventUtil = {
  addHandler: function(element, type, handler, bool) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, bool | false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler, bool) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, bool | false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = undefined;
    }
  }
};

var Style = function(pElement) {
  return {
    get left() {
      return Number(pElement.style.left.replace('px', '') || pElement.offsetLeft);
    },
    set left(pValue) {
      pElement.style.left = pValue + 'px';
    },
    get top() {
      return Number(pElement.style.top.replace('px', '') || pElement.offsetTop);
    },
    set top(pValue) {
      pElement.style.top = pValue + 'px';
    },
    get width() {
      return Number(pElement.style.width.replace('px', '') || pElement.clientWidth);
    },
    set width(pValue) {
      pElement.style.width = pValue + 'px';
    },
    get height() {
      return Number(pElement.style.height.replace('px', '') || pElement.clientHeight);
    },
    set height(pValue) {
      pElement.style.height = pValue + 'px';
    },
  };
};

var Switch = React.createClass({
    getInitialState: function() {
        return {enable:(this.props.enable==undefined)?true:this.props.enable,rate:(this.props.rate==undefined)?0:this.props.rate,Mousedown:false};
    },
    componentWillMount: function () {
        this.LocX = 0;
        this.maxX = 0;
        this.move = false;
        this.btnW = 0;
    },
    componentDidMount:function(rootNode){        
        this.SetRate(this.state.rate);
    },
    onMouseDown: function(e) {
        if(this.state.enable){  
            this.LocX = e.clientX - Style(this.refs.button).left;           
            this.SetRate((e.clientX - this.LocX)/this.maxX);
            this.setState({Mousedown:true})
            EventUtil.addHandler(window, 'mouseup', this.onMouseUp);
            EventUtil.addHandler(this.refs.switch, 'mousemove', this.onMouseMove);
        }
    },
    SetRate:function(value){
        this.btnW = Style(this.refs.button).width
        this.maxX = Style(this.refs.switch).width - this.btnW;
        var rate = Math.min(Math.max(value,0),1);
        this.setState({rate:rate});  
    },
    onMouseMove: function(e) {
        if(this.state.Mousedown){           
            this.SetRate((e.clientX - this.LocX)/this.maxX);       
        }
    },
    onMouseUp: function(e) {        
        this.setState({Mousedown:false})
        EventUtil.removeHandler(window, 'mouseup', this.onMouseUp);
        EventUtil.removeHandler(this.refs.switch, 'mousemove', this.onMouseMove);
    },
    onClick: function(e) {        
        console.log(e.pageX,e.clientX,e.timeStamp);
    },
    render: function() {
        var SwitchClass = "Switch " + (this.state.enable ? "" : "disable");
        //var ButtonClass = "Button " + (this.state.open ? "active" : "");
        var title = (this.state.enable ? Math.round(100*this.state.rate) + "%" : "禁用");
        var ButtonStyle = {};
        var RateStyle = {};
        var ButtonClass = "Button ";
        if(this.state.Mousedown){
            ButtonStyle.transition= 'all 0s'; 
            RateStyle.transition= 'all 0s';
            ButtonClass+='active';
        }
        ButtonStyle.left = this.state.rate*this.maxX + 'px';
        RateStyle.width= (this.btnW*0.5+this.state.rate*this.maxX) + "px";
        return (
                <div ref = "switch" className = {SwitchClass} title = {title} >
                    <div className = "RateBg" onClick = {this.onClick}></div>
                    <div className = "Rate"  style = {RateStyle} onClick = {this.onClick}></div>
                    <label ref = "button" className = {ButtonClass}  style = {ButtonStyle} onMouseDown = {this.onMouseDown}></label>
                </div> 
        );
    }
});
ReactDOM.render(
    <Switch rate = {0} />,
    document.getElementById('example01')
);
ReactDOM.render(
    <Switch rate = {0.5} />,
    document.getElementById('example02')
);
ReactDOM.render(
    <Switch rate = {0} enable = {false}/>,
    document.getElementById('example03')
);