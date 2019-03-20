const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize == undefined)
			maxSize = 30;
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
		this.queue = [];
	}

	push(data, priority) {
		if (this.size() < this.maxSize){
			this.heap.push(data, priority);
		}else{
			throw new Error("queue is full");
		}
	}

	shift() {
		if (!this.isEmpty()){
			return this.heap.pop();		
		}else{
			throw new Error("queue is empty");
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
