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

	sort() {

}

	pop() {
		
		if (!this.root) return;

		this.heapSize--;
		
		let dRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(dRoot);
		if(this.root){
			this.shiftNodeDown(this.root);
			//check other parent's child after shiftNodeDown
			if (this.root.left && this.root.left.priority > this.root.priority){
					this.shiftNodeDown(this.root);
			}

			if (this.root.right && this.root.right.priority > this.root.priority) {
					this.shiftNodeDown(this.root);
			}	
		}	
		return dRoot.data;
	}

	detachRoot() {
		let root = this.root;
		this.root = null;

		let indexOfRoot = this.parentNodes.indexOf(root)
		if (indexOfRoot !=-1){
			 this.parentNodes.splice(indexOfRoot,1);
		}

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length>0) {
			// restore parentNodes after trimming last node
			var lastInsertedNode = this.parentNodes.pop();
			if(lastInsertedNode.parent){
				this.parentNodes.unshift(lastInsertedNode.parent);
			}
				
			// remove from parent
			lastInsertedNode.remove();
			lastInsertedNode.parent = null;
			
			//added child
			if (detached.right) {
				lastInsertedNode.right = detached.right;
				lastInsertedNode.right.parent = lastInsertedNode;
			}else{
				lastInsertedNode.right = null;
			}

			if (detached.left) {
				lastInsertedNode.left = detached.left;
				lastInsertedNode.left.parent = lastInsertedNode;
			}else{
				lastInsertedNode.left = null;
			}
				
			this.root = lastInsertedNode;

			// new root have not a child('s) add it in parentNodes like a first element
			if(!this.root.left || !this.root.right){
			 	this.parentNodes.unshift(this.root); 
			}

			// remove detached node from parentNodes
		 let positionDetached = this.parentNodes.indexOf(detached);
		 if (positionDetached != -1){
		 	this.parentNodes.splice(positionDetached,1);
		 }
		}
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

	changePositionNodeInParentNodes(node){
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
	}

	shiftNodeUp(node) {
		if (!node.parent){
			this.root = node;
		}else{
			if (node && node.parent.priority < node.priority){
				this.changePositionNodeInParentNodes(node);
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
	}

	shiftNodeDown(node) {

		let childLeft = node.left;
		let childRight = node.right;
		
		if (childLeft && childLeft.priority>node.priority){
			
			if(!node.parent){
				this.root = childLeft;
			}
			this.changePositionNodeInParentNodes(childLeft);
			childLeft.swapWithParent();
			
			this.shiftNodeDown(node);
		}else if (childRight && childRight.priority>node.priority){
			if(!node.parent){
				this.root = childRight;
			}
			this.changePositionNodeInParentNodes(childRight);
			childRight.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
