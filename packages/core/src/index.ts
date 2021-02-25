import program from "commander";
import chokidar from "chokidar";
import fs from "fs";
import { ActionTree, RecodulatePlugin } from "./types";

export * from "./types";

const actions: ActionTree = {
  hello: {
    world: {
      type: "user",
      name: "world",
      path: "/Users/les/projects/personal/recodulate/example/actions/hello/world.js"
    }
  },
  react: {
    component: {
      type: "lib",
      name: "component",
      path: "@recodulate/react"
    }
  }
};

var _working = false;

program
  .version("0.0.1")
  .command("watch")
  .action(() => {
    console.log("Watch action");
    runWatch();
  });

program.parse();

function runWatch() {
  let watcher = chokidar.watch(["src/**"], {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcher
    .on("add", (path) => console.log(`File ${path} has been added`))
    .on("change", (path) => {
      console.log("Change", path);
      processFile(path);
    })
    .on("unlink", (path) => console.log(`File ${path} has been removed`));
}

function processFile(path: string) {
  if (_working) {
    _working = false;
    return;
  }
  _working = true;
  var contents = fs.readFileSync(path, "utf8");
  let imports: string[] = [];
  const addImport = (s: string) => imports.push(s);

  const regex = /\/\/\^([^\^]*)[\^|\n]/g;
  let m;
  while ((m = regex.exec(contents)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });

    // The result can be accessed through the `m`-variable.

    if (m.length >= 1) {
      let g = m[1];
      let result = processAction(path, g, addImport);
      if (result !== null) {
        console.log("Replacing:", m[0], "with", result);
        contents = contents.replace(`${m[0]}`, result);
      }
    } else {
      m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
      });
    }

    contents = imports.join("\n") + "\n" + contents;

    fs.writeFileSync(path, contents, "utf8");
  }
}

function processAction(path: string, command: string, addImport: (s: string) => void) {
  let result: string | null = null;

  let { plugin, param } = getAction(actions, command);

  if (!plugin) {
    console.log("Plugin not found");
    return result;
  }

  if (plugin.type == "user") {
    result = require(plugin.path)({
      path,
      param,
      addFile,
      addImport
    });
  } else {
    result = require(plugin.path)[plugin.name]({
      path,
      param,
      addFile,
      addImport
    });
  }

  return result;
}

function addFile(path: string, contents: string) {
  fs.writeFileSync(path, contents, "utf8");
}

function getAction(tree: ActionTree, command: string): { plugin: RecodulatePlugin | undefined; param: string } {
  let actionPath = command.substring(0, command.indexOf(" "));
  let param = command.substring(command.indexOf(" ") + 1);
  let actionTree = actionPath.split(".");
  let plugin: RecodulatePlugin | undefined;
  let obj: any = tree;
  actionTree.forEach((name) => {
    if (obj[name]) obj = obj[name];
  });

  if (obj.type !== undefined) {
    plugin = obj as RecodulatePlugin;
  }

  return {
    plugin,
    param
  };
}
