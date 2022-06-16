const params = {
    encoder: {
        baseHeight: 0.5,
        baseRadius: 3.18,
        centerRadius: 1.27,
        spacing: 0.5,
        topSpacing: 0.1,
        rows: [
            {
                teeth: 40,
                len: 0.3,
                width: 0.1,
            },
            {
                teeth: 40,
                len: 0.3,
                width: 0.1
            }
        ],
        edge: {
            thickness: 0.1,
            height: 0.2
        },
        clock: {
            width: 0.3,
            height: 0.3,
            len: 0.15
        },
        notch: {
            width: 0.3,
            len: 0.15
        }
    },
    base: {
        width: 7.62,
        len: 7.62,
        height: 0.3,
        column: {
            baseHeight: 3,
            ledge: {
                width: 0.1,
                height: 0.3
            }
        }
    }
}

module.exports = { params };