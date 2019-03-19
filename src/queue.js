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
		this.heap.push(data, priority);
		this.heap.push()
		if (this.size() >= this.maxSize){
			throw new UserException("queue is full");
		}
	}

	shift() {
	//	console.log(1);
		
		if (this.isEmpty()){
			throw new UserException("queue is empty");
		}
		return this.heap.pop();

	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.size() == 0;
	}
}

module.exports = PriorityQueue;
