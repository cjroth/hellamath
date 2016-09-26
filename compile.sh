emcc -O2 hello_world.c -s EXPORTED_FUNCTIONS="['_absolute']" -s TOTAL_MEMORY=671088640 && node wut.js
