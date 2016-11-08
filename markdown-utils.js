module.exports = function(RED) {
	
    function RemoveMarkdown(config) {
        RED.nodes.createNode(this,config);
        var node = this;

//      var RemoveMarkdown = require('remove-markdown');
        var strip = require('strip-markdown');
        var remark = require('remark');
        var processor = remark().use(strip);

        try {
    		this.on('input', function(msg) {
//    	    	var plainText = RemoveMarkdown(msg.payload);
    	        var plainText = processor.process(msg.payload);
    	        msg.payload = String(plainText).replace(/^\s*[\r\n]/gm, "");
                node.send(msg);
                });
                                
        }
    	catch(e){
    		node.error("Ops, there is an error...!", msg);
        }
    }
    
    function FrontMatter(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var matter = require('gray-matter');
        
        try {
    		this.on('input', function(msg) {
    		var frontmatter = matter(msg.payload).data;
    		msg.payload = frontmatter;

                    node.send(msg);
                });
                                
        }
    	catch(e){
    		node.error("Ops, there is an error...!", msg);
        }
    }
    
    function MarkdownUtils(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var strip = require('strip-markdown');
        var remark = require('remark');
        var processor = remark().use(strip);
        var matter = require('gray-matter');

        try {
    		this.on('input', function(msg) {
    		    
    		var frontmatter = matter(msg.payload).data;
    	        var plainText = processor.process(msg.payload);
    	        var clean = String(plainText).replace(/^\s*[\r\n]/gm, "");
    	        
    	        msg.payload = {'content':clean, 'metadata':frontmatter};

                node.send(msg);
                });
                                
        }
    	catch(e){
    		node.error("Ops, there is an error...!", msg);
        }
    }
    RED.nodes.registerType("remove-md",RemoveMarkdown);
    RED.nodes.registerType("front-matter-md",FrontMatter);
    RED.nodes.registerType("utils-md",MarkdownUtils);
}
