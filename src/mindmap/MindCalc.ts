import MindContext from "./MindContext";
import MindNode from "./MindNode";
import MindToken from "./MindToken";
import {TokenType} from "./MindToken";
const NODE_PADDING = 50;

export default function calc(context:MindContext):void {
    let root = context.node;
    if(context.nodePadding===undefined){
        context.nodePadding=NODE_PADDING;
    }
    calcSize(root);
    calcXY(root,context);
}
function calcSize(node:MindNode){
    node.width = 100;
    node.height = 60;
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