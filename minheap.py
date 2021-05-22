class Node:
    def __init__(self, freq, char, left = None, right = None):
        self.freq = freq
        self.char = char
        self.left = left
        self.right = right

class MinHeap:
    def __init__(self):
        self.leafs = [None]

    def push(self, data: Node):
        self.leafs.append(data)
        i = len(self.leafs) - 1

        while i > 1:
            child = self.leafs[i]
            parent = self.leafs[int(i / 2)]

            if child.freq < parent.freq:
                temp = child
                self.leafs[i] = parent
                self.leafs[int(i / 2)] = temp

                i = int(i / 2)
            else:
                break

    def pull(self):
        last = len(self.leafs) - 1
        if last < 0:
            return -1

        temp = self.leafs[1]
        self.leafs[1] = self.leafs[last]
        self.leafs[last] = temp

        v = self.leafs.pop()
        self.align(1)
        return v

    def align(self, i: int):
        left = i * 2
        right = i * 2 + 1
        min_i = i
        last = len(self.leafs) - 1

        if left <= last and self.leafs[min_i].freq > self.leafs[left].freq:
            min_i = left
        if right <= last and self.leafs[min_i].freq > self.leafs[right].freq:
            min_i = right

        if min_i != i:
            temp = self.leafs[i]
            self.leafs[i] = self.leafs[min_i]
            self.leafs[min_i] = temp

            self.align(min_i)

    def show(self):
        for d in self.leafs[1:]: print(d.freq)
