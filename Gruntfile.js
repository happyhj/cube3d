module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "options": { "separator": ";" },
            "build": {
                "src": ["src/Cube3D.Common.Math.c3Vec3.js"
						,"src/Cube3D.Collision.Shapes.js"
                		, "src/Cube3D.Dynamics.js"
                		, "src/Cube3D.Dynamics.c3World.js"
                		, "src/Cube3D.Dynamics.c3DebugDraw.js"
                		],
                "dest": "build/Cube3D.js"
            }
        }
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Task definitions
    grunt.registerTask('default', ['concat']);
};