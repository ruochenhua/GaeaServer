function GridDesc(row, col, size, position) {
    this.row = row;
    this.col = col;
    this.size = size;   //single grid size
    this.position = position;
}

GridDesc.prototype.CreateGrid = function () {
    let line_mat = new THREE.LineBasicMaterial({color:0xffffff});

    let line_list = [];

    let g_size = this.size;
    let row_len = this.row * g_size;

    let col_len = this.col * g_size;
    let start_pos = new THREE.Vector3(this.position.x - row_len/2.0, this.position.y, this.position.z - col_len/2.0);

    for(let i = 0; i <= this.row; i++) {
        let n_line_geo = new THREE.Geometry()
        n_line_geo.vertices.push(new THREE.Vector3(start_pos.x + i*g_size, start_pos.y, start_pos.z));
        n_line_geo.vertices.push(new THREE.Vector3(start_pos.x + i*g_size, start_pos.y, start_pos.z + col_len));

        let n_line = new THREE.Line(n_line_geo, line_mat);
        line_list.push(n_line);
    }


    for(let i = 0; i <= this.col; i++) {
        let n_line_geo = new THREE.Geometry()
        n_line_geo.vertices.push(new THREE.Vector3(start_pos.x, start_pos.y, start_pos.z + i*g_size));
        n_line_geo.vertices.push(new THREE.Vector3(start_pos.x + row_len, start_pos.y, start_pos.z + i*g_size));

        let n_line = new THREE.Line(n_line_geo, line_mat);
        line_list.push(n_line);
    }
    //add grid lines
    //row lines
    return line_list;
}