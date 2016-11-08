var RemoveMarkdown = require('remove-markdown');
var markdown = "---\n{'a':'b', 'val':'value!'}\n---\n";
markdown += '# This is a heading\n\nThis is a paragraph with [a link](http://www.disney.com/) in it.';
var plainText = RemoveMarkdown(markdown);

var strip = require('strip-markdown');
var remark = require('remark');
var fm = require('json-front-matter');
var matter = require('gray-matter');
var processor = remark().use(strip);
var file = processor.process(markdown);
var doc = String(file).replace(/^\s*[\r\n]/gm, "");

var frontmatter = matter(markdown);

console.log(plainText);
console.log("-.-.-.-.-.-.-.-.-.-.-\n");
console.log(doc);
console.log("-.-.-.-.-.-.-.-.-.-.-\n");
console.log(frontmatter.data.val);

var sha1 = require('sha1');
var id = sha1("src/main/forms/form5/index.md");
console.log(id);