(function($) {
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	
	var lineDots = {};
//	var refLine = null;
	
	WFGraph.drawLineAddition = function(currentSeq) {
		lineDots = new drawLinePoints(currentSeq);
	}
	
	WFGraph.removeLineAddition = function() {
		if (lineDots && lineDots.remove) {
			lineDots.remove();
		}
	}
	
	function drawPoint(seqLine, data) {
		var curObj = this, type = data.dotType, N = data.midDot, 
		fromDot = data.fromDot, toDot = data.toDot, h, attr;
		switch (type) {
	        case "from":
	        	h = WFConfig.lineEndPointAnchor.h;
	        	attr = WFConfig.lineEndPointAnchor.attr;
	            break;
	        case "turn":
	        	h = WFConfig.lineMidPoint.h;
	        	attr = WFConfig.lineMidPoint.attr;
	            break;
	        case "mid":
	        	h = WFConfig.lineMidPoint.h;
	        	attr = WFConfig.lineMidPoint.attr;
	            break;
	        case "to":
	        	h = WFConfig.lineEndPointAnchor.h;
	        	attr = WFConfig.lineEndPointAnchor.attr;
	            break
	    }
		var point = {x : N.x - h/2, y : N.y - h/2}
		var anchorDot = WFGraph.wfd_R.rect(point.x, point.y, h, h).attr(attr).show();
		if (anchorDot) {
			anchorDot.drag(function(dx, dy) {
                moveFun(dx, dy);
            },
            function() {
                startFun();
            },
            function() {
                endFun();
            });
			var anchorOldX, anchorOldY, x, y;
            var moveFun = function(dx, dy) {
                if (0 == dx && 0 == dy) {
					return;
				}
				x = anchorOldX + dx;
				y = anchorOldY + dy;
				
				curObj.resetLinePoint(x, y);
            };
            var startFun = function() {
            	anchorOldX = anchorDot.attr("x") + h / 2;
				anchorOldY = anchorDot.attr("y") + h / 2;
            };
            var endFun = function() {
//            	if (refLine) {
//            		refLine.hide();
//            	}
			};
        }
        
        this.position = function(value) {
            if (value) {
                N = value;
                anchorDot.attr({
                    x: N.x - anchorDot.attr("width") / 2,
                    y: N.y - anchorDot.attr("height") / 2
                });
                return this;
            } else {
                return N;
            }
        };
		
		this.resetLinePoint = function(x, y) {
			var isUpdate = false;
			switch (type) {
		        case "from":
		        	//TODO：拖拽起点：起点位置改变，起点的后一个中点位置改变
                    var fNode = seqLine.model.sourceNode;
                    var tNode = seqLine.model.targetNode;
                    var selectedNode = WF.getMouseOverSelected();
                    var fromFlag = true;
                    if (selectedNode) {
                    	if (selectedNode.model.type == "endEvent") {
                    		fromFlag = false;
                    	}
                    	if (fromFlag && selectedNode.model.id != fNode.model.id && 
                    			WFGraph.isStartSeqExist(selectedNode.model.id)) {
                    		fromFlag = false;
                    	}
                    	if (fromFlag && selectedNode.model.id != fNode.model.id 
                				&& WFGraph.isNodeSeqExist(selectedNode.model.id, tNode.model.id)) {
                			fromFlag = false;
                		}
                    	if (fromFlag && selectedNode.model.id == tNode.model.id) {
                    		fromFlag = false;
                    	}
                    } else {
                    	fromFlag = false;
                    }
                    if (fromFlag) {
                		if (seqLine.useAuto() == "N") {
                			var S = WFGraph.lineUtil.calculateQuadrant(selectedNode.position, x, y);
                			if (S) {
                        		isUpdate = true;
                        		this.position(S);
                            	toDot.position(getCenterDot(S, toDot.toDot().position()));
                        		if (selectedNode.model.id != tNode.model.id) {
                            		seqLine.model.sourceNode = selectedNode;
                            	}
                        	}
                		} else {
                			var newP = WFGraph.calculateLineWhenMoveEndpoints(seqLine, x, y, true);
                			if (newP) {
                				seqLine.setPath(newP);
                				WFGraph.showOperation({type:"flow", node : seqLine});
                				isUpdate = true;
                				updateLinePoints(seqLine);
                        	}
                		}
                    }
		            break;
		        case "turn":
		        	isUpdate = true;
					seqLine.useAuto("N");
		        	this.position({x : x, y : y});
		        	//TODO：拖拽折点：当前折点的位置改变，和折点关联的线段的中点位置改变
                    if (fromDot && fromDot.fromDot()) {
                    	fromDot.position(getCenterDot(fromDot.fromDot().position(), N));
                    }
		        	if (toDot && toDot.toDot()) {
		        		toDot.position(getCenterDot(N, toDot.toDot().position()));
                    }
		        	// 如果折点在前后折点的线段上，折点变中点，删除两个中点
		        	var fDotPos = fromDot.fromDot().position();
	        		var tDotPos = toDot.toDot().position();
	        		var M = {x : x, y : y};
		        	if (isDotOnLine(fDotPos, M, tDotPos)) {
		        		type = "mid";
		        		this.position(M);
//		        		showRefLine(fDotPos, tDotPos);
		        		
		        		var F = fromDot;
		        		fromDot.fromDot().toDot(fromDot.toDot());
		        		fromDot = fromDot.fromDot();
		        		F.remove();
		        		var T = toDot;
		        		toDot.toDot().fromDot(toDot.fromDot());
		        		toDot = toDot.toDot();
		        		T.remove()
		        	}
		            break;
		        case "mid":
		        	isUpdate = true;
	        		seqLine.useAuto("N");
		        	var mMid = {x : x, y : y};
		        	//TODO：拖拽中点：当前中点变为折点，新增两个中点
		        	if (!isDotOnLine(fromDot.position(), mMid, toDot.position())) {
			        	this.position(mMid);
		        		type = "turn";
		        		var lMidDot = new drawPoint(seqLine, {dotType : "mid", 
		        			midDot : getCenterDot(fromDot.position(), N), 
		        			fromDot : fromDot, toDot : fromDot.toDot()});
		        		fromDot.toDot(lMidDot);
		        		fromDot = lMidDot;
		        		var rMidDot = new drawPoint(seqLine, {dotType : "mid", 
		        			midDot : getCenterDot(N, toDot.position()), 
		        			fromDot : toDot.fromDot(), toDot : toDot});
		        		toDot.fromDot(rMidDot);
		        		toDot = rMidDot;
		        	}
		            break;
		        case "to":
		        	//TODO：拖拽终点：终点位置改变，终点的前一个中点位置改变
		        	var tfNode = seqLine.model.sourceNode;
                    var ttNode = seqLine.model.targetNode;
                    var selectedNode = WF.getMouseOverSelected();
                    var ep;
                    // 鼠标悬浮位置：1）必须是环节，2）不能是起始环节，
                    // 3）不能和线的源节点是同一个节点,
                    // 4）和线的目标节点是同一个节点，或 源节点和鼠标悬浮节点的连线不存在
                    var toFlag = true;
                    if (selectedNode) {
                    	if (selectedNode.model.type == "startEvent") {
                    		toFlag = false;
                    	}
                    	if (toFlag && selectedNode.model.id != ttNode.model.id 
                    			&& WFGraph.isEndSeqExist(selectedNode.model.id)) {
                    		toFlag = false;
                    	}
                    	if (toFlag && selectedNode.model.id != ttNode.model.id 
                				&& WFGraph.isNodeSeqExist(tfNode.model.id, selectedNode.model.id)) {
                			toFlag = false;
                		}
                    	if (toFlag && selectedNode.model.id == tfNode.model.id) {
                    		toFlag = false;
                    	}
                    } else {
                    	toFlag = false;
                    }
                    if (toFlag) {
                		if (seqLine.useAuto() == "N") {
                			var E = WFGraph.lineUtil.calculateQuadrant(selectedNode.position, x, y);
                			if (E) {
                        		isUpdate = true;
                            	this.position(E);
                            	fromDot.position(getCenterDot(fromDot.fromDot().position(), E));
                        		if (selectedNode.model.id != ttNode.model.id) {
                            		seqLine.model.targetNode = selectedNode;
                            	}
                        	}
                		} else {
                			var newP = WFGraph.calculateLineWhenMoveEndpoints(seqLine, x, y, false);
                			if (newP) {
                				seqLine.setPath(newP);
                				WFGraph.showOperation({type:"flow", node : seqLine});
                				isUpdate = true;
                				updateLinePoints(seqLine);
                        	}
                		}
                    }
		            break;
		    }
			// 更新线
			if (isUpdate == true) {
				updateLine(seqLine);
			}
		}
		
		this.type = function(value) {
            if (value) {
            	type = value;
            } else {
                return type;
            }
        };
        
        this.fromDot = function(value) {
            if (value) {
            	fromDot = value;
            } else {
                return fromDot;
            }
        };
        this.toDot = function(value) {
            if (value) {
                toDot = value;
            } else {
                return toDot;
            }
        };
        this.remove = function() {
            fromDot = null;
            toDot = null;
            anchorDot.remove()
        };
	}
	
	function updateLine(seqLine) {
		var D = lineDots.fromDot();
		var newP = {};
		var i = 0;
        while (D) {
            if (D && D.type() != "mid") {
            	newP[i] = D.position();
            	i++
            }
            D = D.toDot();
        }
        seqLine.setPath(newP);
        WFGraph.showOperation({type:"flow", node : seqLine});
	}
	
	function getCenterDot(from, to) {
		return {x : (from.x + to.x)/2, y : (from.y + to.y)/2};
	}
	
	function isDotOnLine(fDotPos, mDotPos, tDotPos) {
		var k, c;
        if ((fDotPos.x - tDotPos.x) == 0) {
            k = 1;
        } else {
            k = (fDotPos.y - tDotPos.y) / (fDotPos.x - tDotPos.x);
        }
        c = (mDotPos.x - tDotPos.x) * k + tDotPos.y;
        if ((mDotPos.y - c) < 10 && (mDotPos.y - c) > -10) {
        	mDotPos.y = c;
            return true;
        }
        return false;
    }
	
//	function showRefLine(fDotPos, tDotPos) {
//		var k = (fDotPos.y - tDotPos.y) / (fDotPos.x - tDotPos.x);
//		var b = fDotPos.y - fDotPos.x * k;
//		var vX = -b / k, vY = b;
//		if (refLine) {
//			refLine.attr({path : "M"+vX+",0 "+"L0,"+vY}).show();
//		} else {
//			refLine = WFGraph.wfd_R.path("M"+vX+",0 "+"L0,"+vY).show();
//		}
//	}
	
	function updateLinePoints(currentSeq) {
		var startDot, endDot;
		startDot = lineDots.fromDot();
		endDot = lineDots.toDot();
		var s = currentSeq.pointList[0], e = currentSeq.pointList[currentSeq.dotNum - 1];
		startDot.position(s);
		endDot.position(e);
		var D = lineDots.fromDot();
		while (D) {
            if (D && D.type() != "from" && D.type() != "to") {
            	var F = D;
            	D = D.toDot();
            	F.remove();
            } else {
            	D = D.toDot();
            }
        }
		drawMidPoints(currentSeq, startDot, endDot);
	}
	
	function drawLinePoints(currentSeq) {
		var startDot, endDot;
		// 起点
		var s = currentSeq.pointList[0];
		startDot = new drawPoint(currentSeq, {dotType : "from", midDot : s, fromDot : null, toDot : null});
		// 终点
		var e = currentSeq.pointList[currentSeq.dotNum - 1];
		endDot = new drawPoint(currentSeq, {dotType : "to", midDot : e, fromDot : null, toDot : null});
		
		drawMidPoints(currentSeq, startDot, endDot);
		
		this.fromDot = function(value) {
			if (value) {
				startDot = value;
			} else {
				return startDot;
			}
		};
		
		this.toDot = function(value) {
			if (value) {
				endDot = value;
			} else {
				return endDot;
			}
		};
		
        this.remove = function() {
            var D = startDot;
            while (D) {
                if (D.toDot()) {
                    D = D.toDot();
                    D.fromDot().remove();
                } else {
                    D.remove();
                    D = null;
                }
            }
        };
	}
	
	function drawMidPoints(currentSeq, startDot, endDot) {
		var midDot, turnDot;
		var s = currentSeq.pointList[0], e = currentSeq.pointList[currentSeq.dotNum - 1];
		if (currentSeq.dotNum == 2) {
			midDot = new drawPoint(currentSeq, {dotType : "mid", midDot : getCenterDot(s, e), fromDot : startDot, toDot : endDot});
			startDot.toDot(midDot);
			endDot.fromDot(midDot);
		} else {
			for (var key in currentSeq.pointList) {
				if (key) {
					var p = currentSeq.pointList[key];
					// 中点
					if (parseInt(key) != 0) {
						var frontKey = parseInt(key)-1;
						midDot = new drawPoint(currentSeq, {dotType : "mid", midDot : getCenterDot(currentSeq.pointList[frontKey], p), fromDot : null, toDot : null});
						// 起点之后的中点
						if (parseInt(key) == 1) {
							midDot.fromDot(startDot);
							startDot.toDot(midDot);
						}
						// 终点之前的中点
						if (parseInt(key) == currentSeq.dotNum - 1) {
							midDot.fromDot(turnDot);
							midDot.toDot(endDot);
							endDot.fromDot(midDot);
							turnDot.toDot(midDot);
						}
						// 其他
						if (parseInt(key) != 1 && parseInt(key) != currentSeq.dotNum -1) {
							midDot.fromDot(turnDot);
							turnDot.toDot(midDot);
						}
					}
					// 折点
					if (parseInt(key) != 0 && parseInt(key) != currentSeq.dotNum -1) {
						turnDot = new drawPoint(currentSeq, {dotType : "turn", midDot : p, fromDot : null, toDot : null});
						turnDot.fromDot(midDot);
						midDot.toDot(turnDot);
					}
				}
			}
		}
	}
	
})(jQuery);