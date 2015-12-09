'use strict'

const cloudinary = require('cloudinary')
const _ = require('lodash')
const config = require('./config')

let currentDir = 'items-png'
let newDir = 'items'


console.log('config');
console.log(config);
cloudinary.config({
		cloud_name: config.cloud_name,
		api_key: config.api_key,
		api_secret: config.api_secret,
});

let moveImages = function (cursor) {
		cloudinary.api.resources(function (result) {
				let newResult = _.pluck(result.resources, 'public_id');
				_.each(newResult, function (value) {
						if (value.search(currentDir) >= 0) {
								cloudinary.uploader.rename(value, newDir + value.slice(currentDir.length))
						}
				})
				moveImages(result.next_cursor)
		}, {
				type: 'upload',
				max_results: 500,
				next_cursor: cursor
		});
}

moveImages();
