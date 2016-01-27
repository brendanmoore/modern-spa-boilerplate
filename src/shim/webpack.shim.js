/**
 *  For webpack on the server-side
 *  We ignore the scss imports.
 */
//don't load at all.
require.extensions[".scss"] = function(m) {
    return m;
};