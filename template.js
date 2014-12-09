/*
 * grunt-init-csharp-solution
 * https://gruntjs.com/
 *
 * Copyright (c) 2014 Jason Imison
 * Licensed under the MIT license.
 */

'use strict';
// Basic template description.
exports.description = 'Create a C# solution with main project + nunit test project'

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with paket'

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  }

  init.process({}, [
    init.prompt('name'),
    {
      name: 'rakefile',
      message: 'Generate Rakefile?',
      default: 'Y/n' 
    }
  ], function(err, props) {
    props.keywords = [];
    props.projectGuid = generateUUID();
    props.testProjectGuid = generateUUID();
  
    var files = init.filesToCopy(props);

    
    for (var file in files) {
      var path = files[file];
      var newFile = file.replace(/name/g, props.name);
      if (file !== newFile) {
        files[newFile] = path;
        delete files[file];
      }
    }
	console.log(props.rakefile);
    if(props.rakefile !== 'Y' && props.rakefile !== 'Y/n') {
      delete files['Rakefile'];
    }

    init.copyAndProcess(files, props, {noProcess: '.paket/**'});

    done();
  });

};
