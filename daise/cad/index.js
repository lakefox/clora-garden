const { cylinder, cuboid } = require('@jscad/modeling').primitives;
const { translate, rotate } = require('@jscad/modeling').transforms;
const { subtract, union } = require('@jscad/modeling').booleans;

// 1 = 10mm

const paramsRaw = require("./params").params;
const params = paramsRaw.encoder;
console.log("paramsRaw");
console.log(paramsRaw);

function main() {
    let parts = [];
    // Base
    let base = translate(
        [0, 0, params.baseHeight / 2],
        cylinder({ radius: params.baseRadius + params.edge.height, height: params.baseHeight })
    );
    let center = translate(
        [0, 0, params.baseHeight / 2],
        cylinder({ radius: params.centerRadius, height: params.baseHeight })
    );
    base = subtract(base, center);
    for (let r = 0; r < params.rows.length; r++) {
        const row = params.rows[r];
        for (let i = 0; i < row.teeth; i++) {
            let next = 0;
            if (typeof params.rows[r - 1] != "undefined") {
                next = params.rows[r - 1].len;
            }
            // Base
            base = subtract(
                base,
                translate(
                    [0, params.baseRadius + 1 - (params.spacing * r + 1) - params.rows[r].len - (next) - params.topSpacing, params.baseHeight / 2],
                    cuboid({ size: [row.width, row.len, params.baseHeight] })
                ));
            base = rotate([0, 0, d2r(360 / row.teeth)], base);
        }
        base = rotate([0, 0, d2r((360 / row.teeth) / 2)], base);
    }
    let edge = translate(
        [0, 0, ((params.baseHeight - (params.edge.thickness * 2)) / 2) + params.edge.thickness],
        subtract(
            cylinder({ radius: params.baseRadius * 2, height: params.baseHeight - (params.edge.thickness * 2) }),
            cylinder({ radius: params.baseRadius, height: params.baseHeight - (params.edge.thickness * 2) }),
        )
    );
    base = subtract(base, edge);

    base = union(base,
        translate(
            [0, params.baseRadius - params.clock.len, params.baseHeight],
            cuboid({ size: [params.clock.width, params.clock.len, params.clock.height] })
        )
    );

    base = subtract(base,
        translate(
            [0, params.centerRadius + params.notch.len / 2 - 0.02, params.baseHeight / 2],
            cuboid({ size: [params.notch.width, params.notch.len, params.baseHeight] })
        )
    )

    parts.push(base);
    return parts;
}

module.exports.main = main;

function d2r(d) {
    return d * (Math.PI / 180);
}

function IN(e) {
    return parseFloat(e[0]) * 25.4;
}