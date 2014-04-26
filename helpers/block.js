var storage = Ember.Object.create({
    blocks: {},

    blockCount: function(name) {
        if (this.blocks[name]) {
            return this.blocks[name].length;
        }
        return 0;
    },

    addBlock: function(name, view) {
        this.blocks[name] = this.blocks[name] || [];
        this.blocks[name].push(view);
        this.render(name);
    },

    removeBlock: function(name, view) {
        var index = this.blocks[name].indexOf(view);
        this.blocks[name].splice(index, 1);
        this.render(name);
    },

    render: function(block) {
        var blocks = this.blocks[block],
            template,
            block = blocks['0'];

        if (blocks.length > 0) {
            var lastBlock = blocks[blocks.length - 1];
            block.set("template", lastBlock.get("origin.template"));
            Ember.run.scheduleOnce("render", function () {
                block.set("context", lastBlock.get("origin.context"));
            });
        }
    }
});

Ember.Handlebars.registerHelper('block', function(blockName, options) {
    var data = options.data,
        context = (options.contexts && options.contexts[0]) || this,
        template = options.fn,
        currentView = data.view;

    // View holding template and context states.
    var blockView = Ember.View.create({
        origin: {
            template: template,
            context: context
        }
    });

    // When the parent view is destroyed, remove it's block references from the stack.
    currentView.on("willDestroyElement", function() {
        storage.removeBlock(blockName, blockView);
    });

    storage.addBlock(blockName, blockView);

    // Only render this block for the first iteration.
    if (storage.blockCount(blockName) == 1) {
        Ember.Handlebars.helpers.view.call(this, blockView, options);
    }
});