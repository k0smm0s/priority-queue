const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		//console.log("pop");
		if (this.heapSize>0){
			this.heapSize--;
		}
		if (this.root != null){
			let root =  this.root;
			let dataRoot =  this.parentNodes.shift();
			let dRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(dRoot);
			this.shiftNodeDown(root);
			
			return dRoot;
		}
	}

	detachRoot() {
		this.root = null;
		var rootP = this.parentNodes.pop();
		return rootP;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if (this.heapSize == 0){
			return true;
		}else{
			return false;
		}			
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
		
	}

	insertNode(node) {
		if (this.isEmpty()){
			this.root = node;
		}else{
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].left && this.parentNodes[0].right){
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
		this.heapSize++;
		
	//	console.log(this.root);
			
		
	
	}

	shiftNodeUp(node) {
		if (!node.parent){
			this.root = node;
		}else{
			if (node && node.parent.priority < node.priority){
				let posNode = this.parentNodes.indexOf(node);
				let posParentNode = this.parentNodes.indexOf(node.parent);
				/**
				 * 	parents haven't right child
				 */
				if ((posNode != -1) && (posParentNode != -1)){
				 	this.parentNodes[posNode] = node.parent;
				 	this.parentNodes[posParentNode] = node;
				}else{
					/**
				 * 	parents have 2 child
				 */
					this.parentNodes[posNode] = node.parent;
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
