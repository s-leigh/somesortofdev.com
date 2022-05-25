module.exports = {
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "entry",
            "corejs": "3.22",
            "targets": "> 0.25%, not dead",
            "modules": "auto"
        }],
        "@babel/preset-typescript",

    ],
    "plugins": [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ],
    "sourceType": "unambiguous"
}
