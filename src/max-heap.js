const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		this.insertNode(new Node(data,priority));
		this.shiftNodeUp(new Node(data,priority));
	}

	pop() {
		//console.log("pop");
		if (this.root != null){
			let root =  this.root;
			let dRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(dRoot);
			this.shiftNodeDown(root);
		}
	}

	detachRoot() {
		this.root = null;
		var rootP = this.parentNodes.shift();
		return rootP;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		if (this.root == null){
			return true;
		}else{
			return false;
		}
			
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		
	}

	insertNode(node) {
		if (this.isEmpty()){
			this.root = node;
		}
			
		this.parentNodes.push(node);
	
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
