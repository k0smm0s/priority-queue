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
			}else	{
				this.left = node;
				this.left.parent = this;
			}
		}

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
			var childLeft = this.parent.left;
			var childRight = this.parent.right;

			if (childRight != null){
				this.parent.removeChild(childRight);
			}
			
			if (childLeft != null){
					this.parent.removeChild(childLeft);
			}
		}
	}

	swapWithParent(){
		

		if (!this.parent) return;
	
		// curr node
		var leftChild = this.left;
		var rightChild = this.right;
		var parent = this.parent;

		// parent node
		var parentOfRightChild = this.parent.right;
		var parentOfLeftChild = this.parent.left;
		var parentOfParent = this.parent.parent;

		// grandparent node
		if(parentOfParent){
				var parentOfParentLeft = this.parent.parent.left;
				var parentOfParentRight = this.parent.parent.right;
		}

		this.parent.parent = this;
		this.parent = parentOfParent;

		// swapping node is right
		if (this == parentOfRightChild){
				if (parentOfLeftChild){
						this.left = parentOfLeftChild;
						parentOfLeftChild.parent = this;
				}

				this.right = parent;
				parent.rigth = rightChild;
				parent.left = leftChild;
		}else{
			// swapping node is left
			if (this == parentOfLeftChild){
					if (parentOfRightChild){
							this.right = parentOfRightChild;
							parentOfRightChild.parent = this;
					}

					this.left = parent;
					parent.rigth = rightChild;
					parent.left = leftChild;
			}
		}

		// correct grandparent child links
		if (parent == parentOfParentLeft){
				this.parent.left = this;
		}else{
			if (parent == parentOfParentRight){
				this.parent.right = this;
			}
		}
	}

}

module.exports = Node;
