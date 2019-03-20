class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!(this.left != null && this.right != null)){
			if (this.left != null){
				this.right = node;
				this.right.parent = this;
				return true;
			}else	{
				this.left = node;
				this.left.parent = this;
				return true;
			}
		}
		return false;

	}

	removeChild(node) {
		if(this.left == node){
			this.left.parent = null;
			this.left = null;
		}else{
			if(this.right == node){
				this.right.parent = null;
				this.right = null;
			}else{
				throw new UserException("error");
			}
		}
	}

	remove() {
		if (this.parent != null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent(){
		if (!this.parent) return;	
		// console.log("start");
		// console.log(this);
		// console.log("==========");
		let parent = this.parent;
		let grandparent = parent.parent;
		let thisParentLeft, thisParentRight, thisLeft, thisRight = false;
		let rightChild = this.right;
		let leftChild = this.left;
		let parentLeftChild = parent.left;
		let parentRightChild = parent.right;
	//	console.log("++");

		if (parent.left == this){
			thisLeft = true;
		}

		if (parent.right == this){
			thisRight = true;
		}

		if (grandparent && grandparent.left == parent){
			thisParentLeft = true;
		}

		if (grandparent && grandparent.right == parent){
			thisParentRight = true;
		}

		this.parent = grandparent;

		if (thisParentLeft){
			this.parent.left = this;
		}

		if (thisParentRight){
			this.parent.right = this;
		}

		parent.left = leftChild;
		parent.right = rightChild;
		
		if (leftChild){
			parent.left.parent = parent;
		}

		if (rightChild){
			parent.right.parent = parent;
		}

		if (thisLeft){
			this.right = parentRightChild;
			if (this.right){
				this.right.parent = this;
			}
			this.left = parent;
			this.left.parent = this;
		}

		if (thisRight){
			this.left = parentLeftChild;
			if (this.left){
				this.left.parent = this;
			}
			this.right = parent;
			this.right.parent = this;
		}
		// console.log("end");
		// console.log(this);
		// console.log("==========");
	}

}

module.exports = Node;
