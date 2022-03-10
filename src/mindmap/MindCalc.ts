import MindContext from "./MindContext";
import MindNode from "./MindNode";
import utils from "../utils";

const NODE_PADDING = 50;
const NODE_SPACING = 20;
const NODE_VERTICAL_SPACING = 20;

export default function calc(context:MindContext):void {
    let root = context.node;
    if(context.nodePadding===undefined){
        context.nodePadding=NODE_PADDING;
    }
    calcSize(root);
    calcXY(root,context);
}
function calcSize(node:MindNode){
    let textMeasure = utils.calculateTextDimensions(node.title,{});
    node.textWidth = textMeasure.width;
    node.textHeight = textMeasure.height;
    
    node.width = textMeasure.width + NODE_SPACING*2;
    node.height = textMeasure.height + NODE_VERTICAL_SPACING;
    if(node.children!=undefined){
        let i = 0;
        node.childrenWidth=0;
        node.childrenHeight=0;
        while(i<node.children.length){
            let child = node.children[i++];
            calcSize(child);
            if(node.childrenWidth<child.width){
                node.childrenWidth = child.width;
            }
            if(isNaN(child.childrenHeight)){
                node.childrenHeight += child.height;
            }else{
                node.childrenHeight += Math.max(child.height,child.childrenHeight);
            }
        }
    }
}
function calcXY(node:MindNode, context:MindContext){
    if(node.parent===undefined){
        node.centerX = node.width/2;
        node.centerY = Math.max(node.childrenHeight,node.height)/2;
    }
    if(node.children!==undefined){
        let i = 0;
        let childY = node.centerY - (node.childrenHeight/2);
        while(i<node.children.length){
            let child = node.children[i++];
            child.centerX = node.centerX + node.width/2 + context.nodePadding + child.width/2;
           
            
            
            let y = child.height;
            if(!isNaN(child.childrenHeight)){
                y = Math.max(child.height,child.childrenHeight);
            }
            child.centerY = childY + y/2;
            childY += y
            calcXY(child,context);
        }
    }
}