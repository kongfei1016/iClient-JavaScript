var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var pkg = require('../package.json');
var packageName = "iclient9-openlayers";
var banner = `
    iclient9-openlayers.(${pkg.homepage})
    Copyright© 2000-2017 SuperMap Software Co. Ltd
    license: ${pkg.license}
    version: v${pkg.version}
`;
module.exports = {
    mode: "production",
    //页面入口文件配置
    entry: {},
    //入口文件输出配置
    output: {
        path: __dirname + '/../dist',
        filename: packageName + ".js"
    },

    //不显示打包文件大小相关警告
    performance: {
        hints: false
    },

    //是否启用压缩
    optimization: {
        minimize: false
    },

    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    externals: {
        'openlayers': 'ol',
        'echarts': 'function(){try{return echarts}catch(e){return {}}}()',
        'mapv': "function(){try{return mapv}catch(e){return {}}}()",
        'elasticsearch': 'function(){try{return elasticsearch}catch(e){return {}}}()',
        '@turf/turf': "function(){try{return turf}catch(e){return {}}}()",
        //for ol-mapbox-style
        'ol/style/style': 'ol.style.Style',
        'ol/style/circle': 'ol.style.Circle',
        'ol/style/icon': 'ol.style.Icon',
        'ol/style/stroke': 'ol.style.Stroke',
        'ol/style/fill': 'ol.style.Fill',
        'ol/style/text': 'ol.style.Text',
        'ol/geom/point': 'ol.geom.Point',
        'ol/proj': 'ol.proj',
        'ol/tilegrid': 'ol.tilegrid',
        'ol/format/geojson': 'ol.format.GeoJSON',
        'ol/format/mvt': 'ol.format.MVT',
        'ol/canvasmap': 'ol.CanvasMap',
        'ol/observable': 'ol.Observable',
        'ol/layer/tile': 'ol.layer.Tile',
        'ol/layer/vector': 'ol.layer.Vector',
        'ol/layer/vectortile': 'ol.layer.VectorTile',
        'ol/source/tilejson': 'ol.source.TileJSON',
        'ol/source/vector': 'ol.source.Vector',
        'ol/source/vectortile': 'ol.source.VectorTile',
        'ol/source/xyz': 'ol.source.XYZ'
    },

    module: {
        noParse: /[\/\\]node_modules[\/\\]openlayers[\/\\]dist[\/\\]ol\.js$/,
        rules: [{
            //图片小于80k采用base64编码
            test: /\.(png|jpg|jpeg|gif|woff|woff2|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 80000
                }
            }]
        }, {
            test: [/\.js$/],
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'eslint-loader',
            options: {
                failOnError: true
            }
        }, {
            test: /\.js$/,
            exclude: /classic/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: {
                    loader: 'css-loader'
                }
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new ExtractTextPlugin('/../dist/' + packageName + ".css"),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};