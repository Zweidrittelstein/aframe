/**
 * Wrapper around TeapotBufferGeometry.js to use as an A-Frame Component
 */
AFRAME.registerComponent('teapot', {
  schema: {
    size: {type: 'number', default: 1},
    segments: {type: 'number', default: 10},
    bottom: {type: 'boolean', default: true},
    lid: {type: 'boolean', default: true},
    body: {type: 'boolean', default: true},
    fitLid: {type: 'boolean', default: false},
    blinn: {type: 'boolean', default: true}
  },

  // Init Teapot
  init: function() {
    this.geometry = null;
  },

  update: function (oldData) {

    var data = this.data;
    var el = this.el;

    // Remove old Geometry
    if (this.geometry) {
      system.unuseGeometry(oldData);
      this.geometry = null;
    }

    // Create new Geometry
    this.geometry = new THREE.TeapotBufferGeometry(data.size, data.segments, data.bottom, data.lid, data.body, data.fitLid, data.blinn);

    // Create or alter Mesh
    mesh = el.getObject3D('mesh');
    if (mesh) {
      mesh.geometry = this.geometry;
    } else {
      mesh = new THREE.Mesh();
      mesh.geometry = this.geometry;
      el.setObject3D('mesh', mesh);
    }
  },

  // Remove Teapot
  remove: function () {
    this.system.unuseGeometry(this.data);
    this.el.getObject3D('mesh').geometry = dummyGeometry;
    this.geometry = null;
  }
});
