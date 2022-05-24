module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "entry"
        }],
        "@babel/preset-typescript",

    ],
    "plugins": [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
}
