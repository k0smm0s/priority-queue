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
			}else{
				if (childLeft != null){
					this.parent.removeChild(childLeft);
				}
			}
		}
	}

	swapWithParent() {
	//	console.log("before");
	//	console.log(this.parent);
		
		if (!this.parent) return;
		var parent = this.parent;
		var leftChild = this.parent.left;
		var rightChild = this.parent.right;



		if(rightChild){
			this.parent.parent = rightChild;
			this.parent.left.parent = rightChild;
		}else{
			if(leftChild){
				if (leftChild.left){
					var leftChildLeft = leftChild.left;

					this.this.parent.left.left = leftChild;
					this.this.parent.left = leftChildLeft;

					this.this.parent.left.left.parent = leftChildLeft;
					this.this.parent.left.parent = this.parent;
				}else{
					this.parent = leftChild;
					this.parent.left = parent;
					this.parent.left.parent = this.parent;
					this.parent.left.left = null;
			//		this.parent.parent = leftChild;
				}	
			}
		}		
	//	console.log("after");
	//	console.log(this.parent);
	}
}

module.exports = Node;
