import MxGraph from 'mxgraph';

let initialized = false;

function BoxShape() {
  mxCylinder.call(this); // eslint-disable-line no-undef
}


export default function InitializeMxGraph() {
  if (!initialized) {
    initialized = true;
    let graph = new MxGraph();
    Object.keys(new MxGraph()).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(graph, key)) {
        window[key] = graph[key];
      }
    });

    mxGraph.prototype.convertValueToString = (cell) => { // eslint-disable-line no-undef
      if (cell.value) {
        if (mxUtils.isNode(cell.value)) { // eslint-disable-line no-undef
          const labelValue = cell.getAttribute('label');
          if (labelValue) {
            return labelValue;
          }
          if (cell.value.nodeName !== 'Edge') {
            return cell.value.nodeName;
          }
        } else if (typeof cell.value.toString === 'function') {
          return cell.value.toString();
        }
      }
      return '';
    };

    mxConnectionHandler.prototype.isConnectableCell = (cell) => { // eslint-disable-line no-undef
      if (!cell) {
        return false;
      }
      const value = cell.getValue();
      if (!value) {
        return false;
      }
      if ([
        'task',
        'start',
        'end',
        'subprocess',
        'document',
        'precondition',
        'event',
        'question',
        'image',
      ].indexOf(value.tagName.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    };

    mxConnectionHandler.prototype.validateConnection = (source, target) => { // eslint-disable-line no-undef
      if (!source || !target) {
        return null;
      }
      const sourceValue = source.getValue();
      const targetValue = target.getValue();
      if (!sourceValue || !targetValue) {
        return null;
      }
      if (source === target && (['document', 'question'].indexOf(sourceValue.tagName.toLowerCase()) !== -1)) {
        return 'Document/Question cannot connect to itself.';
      }

      if (sourceValue.tagName.toLowerCase() === 'image' && targetValue.tagName.toLowerCase() !== 'image') {
        return 'Image cannot connect to non-image element.';
      }
      if (sourceValue.tagName.toLowerCase() !== 'image' && targetValue.tagName.toLowerCase() === 'image') {
        return 'Image cannot connect to non-image element.';
      }
      return null;
    };

    mxGraphHandler.prototype.guidesEnabled = true; // eslint-disable-line no-undef
    mxConnectionHandler.prototype.connectImage = new mxImage('/resolve/jsp/model/images/connector.gif', 16, 16); // eslint-disable-line no-undef,new-cap

    graph = null;

    /*
         The next lines use an mxCylinder instance to augment the
         prototype of the shape ("inheritance") and reset the
         constructor to the topmost function of the c'tor chain.
    */
    mxUtils.extend(BoxShape, mxCylinder); // eslint-disable-line no-undef

    // Defines the extrusion of the box as a "static class variable"
    BoxShape.prototype.extrude = 10;
    BoxShape.prototype.redrawPath = (path, x, y, w, h, isForeground) => {
      const dx = 30;

      if (isForeground) {
        path.moveTo(w - dx, 0);
        path.lineTo(w - dx, h);
        path.lineTo(w, h);
        path.lineTo(w, 0);
      } else {
        path.moveTo(0, 0);
        path.lineTo(w, 0);
        path.lineTo(w, h);
        path.lineTo(0, h);
        path.close();
      }
    };

    BoxShape.prototype.paintVertexShape = (c, x, y, w, h) => {
      c.translate(x, y);
      c.begin();
      this.redrawPath(c, x, y, w, h, false);
      c.state.fillColor = '#333534'; // eslint-disable-line no-param-reassign
      c.fillAndStroke();

      c.setShadow(false);

      c.begin();
      this.redrawPath(c, x, y, w, h, true);
      c.state.fillColor = this.fill; // eslint-disable-line no-param-reassign
      c.fillAndStroke();
    };

    /*
      The custom shape can be registered globally or in each cellRenderer
      instance. In this example, the shape is registered globally. For
      registering the shape in a cellRenderer instance, the following
      code can be used:

      graph.cellRenderer.registerShape('box', BoxShape);
    */
    mxCellRenderer.registerShape('box', BoxShape); // eslint-disable-line no-undef
  }
}
