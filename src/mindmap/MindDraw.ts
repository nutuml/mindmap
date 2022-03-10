import MindContext from "./MindContext";
import MindNode from "./MindNode";
import MindToken from "./MindToken";
import {TokenType} from "./MindToken";

const NODE_STYLE = "fill:white;stroke:black;stroke-width:1;fill-opacity:0.8";
const FRAME_PADDING = 10;

export default function draw(context:MindContext):string { 
   
    if(context.nodeStype===undefined){
        context.nodeStype = NODE_STYLE;
    }

    let html = '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" version="1.1">';
    let node = context.node;
    drawOneNode(node);
        //<rect x="50" y="20" width="150" height="150" />
    html += "</svg>"
    return html;
    function drawOneNode(node:MindNode){
        let rect = "<rect ";
        rect += 'x="' + (node.centerX - node.width/2) + '" ';
        rect += 'y="' + (node.centerY - (node.height - FRAME_PADDING)/2) + '" ';
        rect += 'width="' + node.width + '" ';
        rect += 'height="' + (node.height - FRAME_PADDING) + '" ';
        rect += 'style="' + context.nodeStype + '" ';
        rect += "/>"
       

        //<text x="0" y="15" fill="red">I love SVG</text>
        let text = "<text "
        text += 'x="' + (node.centerX - node.textWidth/2) + '" ';
        text += 'y="' + (node.centerY + 5) + '" ';
        text += 'fill="red">' 
        text += node.title
        text += '</text>\n';
        if(node.children!=undefined){
            let i=0;
            while(i<node.children.length){
                let child = node.children[i++];
                // <path d="M 100 350 q 0 -150 300 -200" stroke="blue"  stroke-width="1" fill="none" />
                let line = '<path '
                line += 'd=" M ' + node.centerX + ' ' + node.centerY 
                    + ' q 0 ' + (child.centerY-node.centerY) + ' ' + (child.centerX-node.centerX) + ' ' + (child.centerY-node.centerY) + '"';
                line += ' stroke="blue"  stroke-width="1" fill="none" />\n'
                html += line;
                drawOneNode(child);
            }
        }
        html += rect + "\n";
        html += text;

    }
}
