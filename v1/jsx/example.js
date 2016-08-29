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

var getPosition = function(el) {
  var Rect = el.getBoundingClientRect();
  return {x:Rect.left + window.scrollX,y: Rect.top + window.scrollY};
}
var Slider = React.createClass({
    getInitialState: function() {
        return {length:this.props.length || 200,outRadius:this.props.outRadius || 20,inRadius:this.props.inRadius || 10,enable:(this.props.enable==undefined)?true:this.props.enable,rate:(this.props.rate==undefined)?0:this.props.rate,Mousedown:false};
    },
    componentWillMount: function () {
        this.LocX = 0;
        this.move = false;
        var length=this.state.length;
        var outRadius=this.state.outRadius;
        var inRadius=this.state.inRadius;        
        this.RateBgStyle = {width:length + 2*inRadius,height:2*inRadius,left:outRadius-inRadius,top:outRadius-inRadius,borderRadius:inRadius}
        this.SliderStyle = {width:length + 2*outRadius,height:2*outRadius};
        this.TouchStyle = {position: 'absolute',display:'block',width:'100%',height:'100%'};
        
        this.ButtonStyle = {width:2*outRadius,height:2*outRadius,borderRadius:outRadius};
        this.RateStyle = {height:2*inRadius,left:outRadius-inRadius,top:outRadius-inRadius,borderRadius:inRadius};
    },
    componentDidMount:function(rootNode){        
        this.SetRate(this.state.rate);
    },
    onMouseDown: function(e) {
        if(this.state.enable){
            var p0 = getPosition(this.refs.button);
            var p1 = getPosition(this.refs.slider);
            this.LocX = e.clientX - p0.x; 
            this.SetRate((p0.x-p1.x)/this.state.length);
            this.setState({Mousedown:true})
            EventUtil.addHandler(window, 'mouseup', this.onMouseUp);
            EventUtil.addHandler(this.refs.slider, 'mousemove', this.onMouseMove);
        }
    },
    SetRate:function(value){
        var rate = Math.min(Math.max(value,0),1);
        this.setState({rate:rate});  
    },
    onMouseMove: function(e) {
        if(this.state.Mousedown){
            var p = getPosition(this.refs.slider);
            this.SetRate((e.clientX - this.LocX-p.x)/this.state.length);       
        }
    },
    onMouseUp: function(e) {        
        this.setState({Mousedown:false})
        EventUtil.removeHandler(window, 'mouseup', this.onMouseUp);
        EventUtil.removeHandler(this.refs.slider, 'mousemove', this.onMouseMove);
    },
    onClick: function(e) {
        if(this.state.enable){  
            var p = getPosition(this.refs.slider);        
            this.SetRate((e.clientX - p.x-this.state.outRadius)/this.state.length);  
        }
    },
    render: function() {
        var rate = this.state.rate;
        var length=this.state.length;
        var inRadius=this.state.inRadius; 
        var SliderClass = "Slider " + (this.state.enable ? "" : "disable");
        var title = (this.state.enable ? Math.round(100*rate) + "%" : "禁用");               
        var ButtonStyle = Object.assign({left : rate*length},this.ButtonStyle )
        var RateStyle = Object.assign({width : 2*inRadius+rate*length},this.RateStyle)
        var ButtonClass = "Button ";
        if(this.state.Mousedown){
            ButtonStyle.transition= 'all 0s'; 
            RateStyle.transition= 'all 0s';
            ButtonClass+='active';
        }
        return (
                <div ref = "slider" className = {SliderClass} style = {this.SliderStyle} title = {title} >                    
                    <div className = "RateBg" style = {this.RateBgStyle}></div>
                    <div className = "Rate" style = {RateStyle}></div>
                    <div style = {this.TouchStyle} onClick = {this.onClick}></div>
                    <label ref = "button" className = {ButtonClass}  style = {ButtonStyle} onMouseDown = {this.onMouseDown}></label>
                </div> 
        );
    }
});
ReactDOM.render(
    <Slider rate = {0} length = {400} outRadius = {15} inRadius = {5}/>,
    document.getElementById('example01')
);
ReactDOM.render(
    <Slider rate = {0.5} />,
    document.getElementById('example02')
);
ReactDOM.render(
    <Slider rate = {0} enable = {false}/>,
    document.getElementById('example03')
);