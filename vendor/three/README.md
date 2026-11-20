three.js 0.187.0 (MIT), https://threejs.org — unmodified build/three.module.js and build/three.core.js from the npm package. Used by the game, the style test and the graphics gallery's 3D test.

`addons/` holds files from the package's examples/jsm (same version, MIT): post-processing (EffectComposer, RenderPass, UnrealBloomPass, OutputPass and what they need), Sky and Water. The only change is the import of `three`, rewritten to the local `../../three.module.js` so they work without a bundler and share one copy of three.js.
