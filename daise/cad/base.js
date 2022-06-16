const { cylinder, cuboid } = require('@jscad/modeling').primitives;
const { translate, rotate } = require('@jscad/modeling').transforms;
const { subtract, union } = require('@jscad/modeling').booleans;

// 1 = 10mm

const paramsRaw = require("./params").params;
const params = paramsRaw.base;

function main() {
    let parts = [];
    let base = translate(
        [0, 0, params.height / 2],
        cuboid({ size: [params.width, params.len, params.height] })
    );
    // ledge
    base = union(base,
        translate(
            [0, 0, params.column.ledge.height / 2 + params.height],
            cylinder(
                { radius: paramsRaw.encoder.centerRadius + params.column.ledge.width + paramsRaw.encoder.notch.len, height: params.column.ledge.height }
            )
        )
    );
    // Base column
    base = union(base,
        translate(
            [0, 0, params.column.baseHeight / 2 + params.height + params.column.ledge.height],
            cylinder(
                { radius: paramsRaw.encoder.centerRadius + paramsRaw.encoder.notch.len, height: params.column.baseHeight }
            )
        )
    );
    // Center column
    base = union(base,
        translate(
            [0, 0, paramsRaw.encoder.baseHeight / 2 + params.height + params.column.baseHeight + params.column.ledge.height],
            cylinder(
                { radius: paramsRaw.encoder.centerRadius, height: paramsRaw.encoder.baseHeight }
            )
        )
    );
    // notch
    base = union(base,
        translate(
            [paramsRaw.encoder.centerRadius, 0, paramsRaw.encoder.baseHeight / 2 + params.height + params.column.baseHeight + params.column.ledge.height],
            cuboid({ size: [paramsRaw.encoder.notch.width, paramsRaw.encoder.notch.len, paramsRaw.encoder.baseHeight] })
        )
    );
    parts.push(base);
    return parts;
}

module.exports.main = main;

function d2r(d) {
    return d * (Math.PI / 180);
}