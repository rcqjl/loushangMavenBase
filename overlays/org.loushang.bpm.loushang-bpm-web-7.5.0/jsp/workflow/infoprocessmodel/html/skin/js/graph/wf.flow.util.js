(function($){
	if (typeof WFGraph == "undefined") {
		WFGraph = {}
	}
	
	WFGraph.turnSetting = function() {
		if (WFConfig.lineTurn && WFConfig.lineTurn.width && WFConfig.lineTurn.height) {
			return [WFConfig.lineTurn.width, WFConfig.lineTurn.height];
		}
		return [50, 50];
	}
	
	var L = {};
	
	L.calculateQuadrant = function(node, x, y) {
		var fromPos = node, refPos = {x:x, y:y};
		var halfW = fromPos.width/2, halfH = fromPos.height/2;
		var fromCenterX = fromPos.x + halfW;
		var fromCenterY = fromPos.y + halfH;
		
		// 正切值
		var tanYX = (fromCenterY - refPos.y)/(fromCenterX - refPos.x);
		// 中点在同一垂直线上
		tanYX = isNaN(tanYX) ? 0 : tanYX;
		// 绝对值
		var absYX = Math.abs(tanYX);
		
		// 参考点在节点的左侧：true，右侧：false
		var f = refPos.x < fromCenterX ? -1 : 1;
		//参考点在节点的上方：true，下方：false
		var h = refPos.y < fromCenterY ? -1 : 1;
		var k = fromPos.height/fromPos.width;
		var newX, newY, direction;
		
		if (absYX > k) {
			if (h == -1) {
				// 上方
				newX = fromCenterX;
				newY = fromPos.y;
				direction = "top";
			} else {
				// 下方
				newX = fromCenterX;
				newY = fromCenterY + halfH;
				direction = "bottom";
			}
		} else {
			if (f == -1) {
				// 左侧
				newX = fromPos.x;
				newY = fromCenterY;
				direction = "left";
			} else {
				// 右侧
				newX = fromCenterX + halfW;
				newY = fromCenterY;
				direction = "right";
			}
		}
		
		return {x : newX, y : newY, direction : direction};
	}
	
	L.calculateAutoLineWithToNode = function(line, node, x, y) {
		// 根据源节点的位置和目标节点的位置，实时计算，判断最优路径
		var fromNode = line.model.sourceNode.position;
		var toNode = node.position;
		
		var fromX = fromNode.x, fromY = fromNode.y, 
			fromWidth = fromNode.width, fromHeight = fromNode.height;
		var fromMidX = fromX + fromWidth/2, fromRightX = fromX + fromWidth, 
			fromMidY = fromY + fromHeight/2, fromBottomY = fromY + fromHeight;
		var fromLeft = {x : fromX, y : fromMidY, direction : "left"},
			fromRight = {x : fromRightX, y : fromMidY, direction : "right"},
			fromBottom = {x : fromMidX, y : fromBottomY, direction : "bottom"},
			fromTop = {x : fromMidX, y : fromY, direction : "top"};
		
		var fromShadowWidth = WFGraph.turnSetting()[0], fromShadowHeight = WFGraph.turnSetting()[1];
		var fromLeftShadowX = fromX - fromShadowWidth, 
			fromRightShadowX = fromRightX + fromShadowWidth, 
			fromTopShadowY = fromY - fromShadowHeight, 
			fromBottomShadowY = fromBottomY + fromShadowHeight;
		
		var toX = toNode.x, toY = toNode.y, 
			toWidth = toNode.width, toHeight = toNode.height;
		var toMidX = toX + toWidth/2, toRightX = toX + toWidth, 
			toMidY = toY + toHeight/2, toBottomY = toY + toHeight;
		var toLeft = {x : toX, y : toMidY, direction : "left"},
			toRight = {x : toRightX, y : toMidY, direction : "right"},
			toBottom = {x : toMidX, y : toBottomY, direction : "bottom"},
			toTop = {x : toMidX, y : toY, direction : "top"};

		// 判断目标节点的位置，根据目标节点的位置动态改变连线的起点、终点坐标
		var startPoint, endPoint;
		
		// 目标节点在源节点的右侧
		if (toX >  fromRightX) {
			startPoint = fromRight;
			endPoint = toLeft;
		} else {
			if (toY > fromBottomY) {
				startPoint = fromBottom;
				endPoint = toTop;
			} else if (toBottomY < fromY) {
				startPoint = fromTop;
				endPoint = toBottom;
			} else {
				startPoint = fromLeft;
				endPoint = toRight;
			}
		}
		
		var newP = calculateLine(fromNode, toNode, startPoint, endPoint);
		return newP;
	}
	
	L.calculateAutoLineWithMouse = function(line, x, y) {
		// 根据源节点的位置和鼠标的位置，实时计算，判断最优路径
		// 判断鼠标的位置，根据鼠标的位置动态改变连线的起点坐标
		var fromNode = line.model.sourceNode.position;
		var fromX = fromNode.x, fromY = fromNode.y, 
			fromWidth = fromNode.width, fromHeight = fromNode.height;
		var fromMidX = fromX + fromWidth/2, fromRightX = fromX + fromWidth, 
			fromMidY = fromY + fromHeight/2, fromBottomY = fromY + fromHeight;
		
		var fromLeft = {x : fromX, y : fromMidY, direction : "left"},
			fromRight = {x : fromRightX, y : fromMidY, direction : "right"},
			fromBottom = {x : fromMidX, y : fromBottomY, direction : "bottom"},
			fromTop = {x : fromMidX, y : fromY, direction : "top"};
		
		var fromShadowWidth = WFGraph.turnSetting()[0], fromShadowHeight = WFGraph.turnSetting()[1];
		var fromLeftShadowX = fromX - fromShadowWidth, 
			fromRightShadowX = fromRightX + fromShadowWidth, 
			fromTopShadowY = fromY - fromShadowHeight, 
			fromBottomShadowY = fromBottomY + fromShadowHeight;

		var fromLeftTopShadowPoint = {x : fromLeftShadowX, y : fromTopShadowY},
			fromLeftMidShadowPoint = {x : fromLeftShadowX, y : fromMidY},
			fromLeftBottomShadowPoint = {x : fromLeftShadowX, y : fromBottomShadowY},
			fromRightTopShadowPoint = {x : fromRightShadowX, y : fromTopShadowY},
			fromRightMidShadowPoint = {x : fromRightShadowX, y : fromMidY},
			fromRightBottomShadowPoint = {x : fromRightShadowX, y : fromBottomShadowY},
			fromTopMidShadowPoint = {x : fromMidX, y : fromTopShadowY},
			fromBottomMidShadowPoint = {x : fromMidX, y : fromBottomShadowY};
		
		var newP = {};
		var i = 0;
		if (x >  fromRightX) {
			newP[i] = fromRight;
			i++;
			if (y == fromMidY) {
				newP[i] = {x:x, y:y};
				i++;
			}
			else {
				var tempShdowRX = x > fromRightShadowX?fromRightShadowX:(fromRightX+x)/2;
				newP[i] = {x:tempShdowRX, y:fromMidY};
				i++;
				newP[i] = {x:tempShdowRX, y:y};
				i++;
				newP[i] = {x:x, y:y};
				i++;
			}
		} else {
			if (y > fromBottomY) {
				newP[i] = fromBottom;
				i++;
				// 在同一垂直线上，则只有起点和终点
				if (x == fromMidX) {
					newP[i] = {x:x, y:y};
					i++;
				}
				else {
					var tempShdowBY = y > fromBottomShadowY?fromBottomShadowY:(fromBottomY+y)/2;
					newP[i] = {x:fromMidX, y:tempShdowBY};
					i++;
					newP[i] = {x : x, y : tempShdowBY};
					i++;
					newP[i] = {x:x, y:y};
					i++;
				}
			} else if (y < fromY) {
				newP[i] = fromTop;
				i++;
				// 在同一垂直线上，则只有起点和终点
				if (x == fromMidX) {
					newP[i] = {x:x, y:y};
					i++;
				}
				// 计算折点
				else {
					var tempShdowTY = y > fromTopShadowY?fromTopShadowY:(fromY+y)/2;
					newP[i] = {x:fromMidX, y:tempShdowTY};;
					i++;
					newP[i] = {x : x, y : tempShdowTY};
					i++;
					newP[i] = {x:x, y:y};
					i++;
				}
			} else {
				newP[i] = fromLeft;
				i++;
				if (y == fromMidY) {
					newP[i] = {x:x, y:y};
					i++;
				}
				else {
					var tempShdowLX = x < fromLeftShadowX?fromLeftShadowX:(fromX+x)/2;
					newP[i] = {x:tempShdowLX, y:fromMidY};
					i++;
					newP[i] = {x:tempShdowLX, y:y};
					i++;
					newP[i] = {x:x, y:y};
					i++;
				}
			}
		}
		return newP;
	}
	
	L.calculateLineWithMouse = function(line, x, y) {
		var startPoint = line.startDot();
		var fromNode = line.model.sourceNode.position;
		
		var fromX = fromNode.x, fromY = fromNode.y, 
			fromWidth = fromNode.width, fromHeight = fromNode.height;
		var fromMidX = fromX + fromWidth/2, fromRightX = fromX + fromWidth, 
			fromMidY = fromY + fromHeight/2, fromBottomY = fromY + fromHeight;
		var fromOneQuarterX = fromX + fromWidth/4, fromThreeQuarterX = fromX + (fromWidth/4)*3;
		
		var fromLeft = {x : fromX, y : fromMidY, direction : "left"},
			fromRight = {x : fromRightX, y : fromMidY, direction : "right"},
			fromBottom = {x : fromMidX, y : fromBottomY, direction : "bottom"},
			fromTop = {x : fromMidX, y : fromY, direction : "top"};
		
		var fromShadowWidth = WFGraph.turnSetting()[0], fromShadowHeight = WFGraph.turnSetting()[1];
		var fromLeftShadowX = fromX - fromShadowWidth, 
			fromRightShadowX = fromRightX + fromShadowWidth, 
			fromTopShadowY = fromY - fromShadowHeight, 
			fromBottomShadowY = fromBottomY + fromShadowHeight;
		var fromLeftTopShadowPoint = {x : fromLeftShadowX, y : fromTopShadowY},
			fromLeftMidShadowPoint = {x : fromLeftShadowX, y : fromMidY},
			fromLeftBottomShadowPoint = {x : fromLeftShadowX, y : fromBottomShadowY},
			fromRightTopShadowPoint = {x : fromRightShadowX, y : fromTopShadowY},
			fromRightMidShadowPoint = {x : fromRightShadowX, y : fromMidY},
			fromRightBottomShadowPoint = {x : fromRightShadowX, y : fromBottomShadowY},
			fromTopMidShadowPoint = {x : fromMidX, y : fromTopShadowY},
			fromBottomMidShadowPoint = {x : fromMidX, y : fromBottomShadowY};
		
		var endPoint  = {x : x, y : y};
		
		var newP = {};
		var i = 0;
		newP[i] = startPoint;
		i++;
		switch(startPoint.direction) {
			case "left" : 
				if (x < fromX) {
					// 鼠标在节点的左侧
					if (y != fromMidY) {
						if (x < fromLeftShadowX) {
							// 鼠标在左侧阴影以左
							newP[i] = fromLeftMidShadowPoint;
							i++;
							newP[i] = {x : fromLeftShadowX, y : y};
							i++;
						} else {
							// 鼠标在左侧阴影内
							newP[i] = {x : x, y : fromMidY};
							i++;
						}
					}
					newP[i] = endPoint;
				} else if (x >= fromX && x <= fromRightX && y >= fromY && y <= fromBottomY) {
					// 鼠标在节点上
					newP[i] = fromLeftMidShadowPoint;
					i++;
					if (y <= fromMidY && x <= fromThreeQuarterX) {
						// 上中点
						newP[i] = fromLeftTopShadowPoint;
						i++;
						newP[i] = fromTopMidShadowPoint;
						i++;
						newP[i] = fromTop;
					} else if (y > fromMidY && x <= fromThreeQuarterX) {
						// 下中点
						newP[i] = fromLeftBottomShadowPoint;
						i++;
						newP[i] = fromBottomMidShadowPoint;
						i++;
						newP[i] = fromBottom;
					} else {
						// 右中点
						newP[i] = fromLeftTopShadowPoint;
						i++;
						newP[i] = fromRightTopShadowPoint;
						i++;
						newP[i] = fromRightMidShadowPoint;
						i++;
						newP[i] = fromRight;
					}
				} else {
					// 鼠标在节点的右侧（节点以外的区域）
					newP[i] = fromLeftMidShadowPoint;
					i++;
					if (y >= fromY && y <= fromBottomY) {
						newP[i] = fromLeftTopShadowPoint;
						i++;
						if (x > fromRightX && x <= fromRightShadowX) {
							// 鼠标在节点的右侧阴影
							newP[i] = {x : x, y : fromTopShadowY};
							i++;
						} else {
							// 鼠标在节点的右侧阴影以右
							newP[i] = fromRightTopShadowPoint;
							i++;
							newP[i] = {x : fromRightShadowX, y : y};
							i++;
						}
					} else {
						newP[i] = {x : fromLeftShadowX, y : y};
						i++;
					}
					newP[i] = endPoint;
				}
				break;
			case "right" :
				if (x > fromRightX) {
					// 鼠标在节点右侧
					if (y != fromMidY) {
						if (x > fromRightShadowX) {
							// 鼠标在右侧阴影以右
							newP[i] = fromRightMidShadowPoint;
							i++;
							newP[i] = {x : fromRightShadowX, y : y};
							i++;
						} else {
							// 鼠标在右侧阴影内
							newP[i] = {x : x, y : fromMidY};
							i++;
						}
					}
					newP[i] = endPoint;
				} else if(x >= fromX && x <= fromRightX &&　y >= fromY && y <= fromBottomY) {
					// 鼠标在节点上
					newP[i] = fromRightMidShadowPoint;
					i++;
					if (y <= fromMidY && x >= fromOneQuarterX) {
						// 上中点
						newP[i] = fromRightTopShadowPoint;
						i++;
						newP[i] = fromTopMidShadowPoint;
						i++;
						newP[i] = fromTop;
					} else if (y > fromMidY && x >= fromOneQuarterX) {
						// 下中点
						newP[i] = fromRightBottomShadowPoint;
						i++;
						newP[i] = fromBottomMidShadowPoint;
						i++;
						newP[i] = fromBottom;
					} else {
						// 左中点
						newP[i] = fromRightTopShadowPoint;
						i++;
						newP[i] = fromLeftTopShadowPoint;
						i++;
						newP[i] = fromLeftMidShadowPoint;
						i++;
						newP[i] = fromLeft;
					}
				} else {
					// 鼠标在节点的左侧（节点以外的区域）
					newP[i] = fromRightMidShadowPoint;
					i++;
					if (y >= fromY && y <= fromBottomY) {
						newP[i] = fromRightTopShadowPoint;
						i++;
						if (x < fromX && x >= fromLeftShadowX) {
							// 鼠标在节点的左侧阴影内
							newP[i] = {x : x, y : fromTopShadowY};
							i++;
						} else {
							// 鼠标在节点的左侧阴影以左
							newP[i] = fromLeftTopShadowPoint;
							i++;
							newP[i] = {x : fromLeftShadowX, y : y};
							i++;
						}
					} else {
						newP[i] = {x : fromRightShadowX, y : y};
						i++;
					}
					newP[i] = endPoint;
				}
				break;
			case "bottom" : 
				if (y > fromBottomY) {
					// 鼠标在节点下侧
					if (x != fromMidX) {
						if (y > fromBottomShadowY) {
							// 鼠标在下侧阴影以下
							newP[i] = fromBottomMidShadowPoint;
							i++;
							newP[i] = {x : x, y : fromBottomShadowY};
							i++;
						} else {
							// 鼠标在下侧阴影内
							newP[i] = {x : fromMidX, y : y};
							i++;
						}
					}
					newP[i] = endPoint;
				} else if (x >= fromX && x <= fromRightX &&　y >= fromY && y <= fromBottomY) {
					// 鼠标在节点上
					newP[i] = fromBottomMidShadowPoint;
					i++;
					if (x <= fromOneQuarterX || y >= fromMidY && x <= fromMidX) {
						// 左中点
						newP[i] = fromLeftBottomShadowPoint;
						i++;
						newP[i] = fromLeftMidShadowPoint;
						i++;
						newP[i] = fromLeft;
					} else if (x >= fromThreeQuarterX || y >= fromMidY && x > fromMidX) {
						// 右中点
						newP[i] = fromRightBottomShadowPoint;
						i++;
						newP[i] = fromRightMidShadowPoint;
						i++;
						newP[i] = fromRight;
					} else {
						// 上中点
						newP[i] = fromLeftBottomShadowPoint;
						i++;
						newP[i] = fromLeftTopShadowPoint;
						i++;
						newP[i] = fromTopMidShadowPoint;
						i++;
						newP[i] = fromTop;
					}
				} else {
					// 鼠标在节点上侧（节点以外的区域）
					newP[i] = fromBottomMidShadowPoint;
					i++;
					if (x >= fromX && x <= fromRightX) {
						if (y < fromY && y >= fromTopShadowY) {
							// 鼠标在节点上侧阴影内
							newP[i] = fromLeftBottomShadowPoint;
							i++;
							newP[i] = {x : fromLeftShadowX, y : y};
							i++;
						} else {
							// 鼠标在节点上侧阴影以上
							newP[i] = fromLeftBottomShadowPoint;
							i++;
							newP[i] = fromLeftTopShadowPoint;
							i++;
							newP[i] = {x : x, y : fromTopShadowY};
							i++;
						}
					} else {
						newP[i] = {x : x, y : fromBottomShadowY};
						i++;
					}
					newP[i] = endPoint;
				}
				break;
			case "top" :
				if (y < fromY) {
					// 鼠标在节点的上侧
					if (x != fromMidX) {
						if (y < fromTopShadowY) {
							// 鼠标在节点的上侧阴影以上
							newP[i] = fromTopMidShadowPoint;
							i++;
							newP[i] = {x : x, y : fromTopShadowY};
							i++;
						} else {
							// 鼠标在节点的上侧阴影内
							newP[i] = {x : fromMidX, y : y};
							i++;
						}
					}
					newP[i] = endPoint;
				} else if (x >= fromX && x <= fromRightX &&　y >= fromY && y <= fromBottomY) {
					// 鼠标在节点上
					newP[i] = fromTopMidShadowPoint;
					i++;
					if (x <= fromOneQuarterX || y <= fromMidY && x <= fromMidX) {
						// 左中点
						newP[i] = fromLeftTopShadowPoint;
						i++;
						newP[i] = fromLeftMidShadowPoint;
						i++;
						newP[i] = fromLeft;
					} else if (x >= fromThreeQuarterX || y >= fromMidY && x > fromMidX) {
						// 右中点
						newP[i] = fromRightTopShadowPoint;
						i++;
						newP[i] = fromRightMidShadowPoint;
						i++;
						newP[i] = fromRight;
					} else {
						// 下中点
						newP[i] = fromLeftTopShadowPoint;
						i++;
						newP[i] = fromLeftBottomShadowPoint;
						i++;
						newP[i] = fromBottomMidShadowPoint;
						i++;
						newP[i] = fromBottom;
					}
				} else {
					// 鼠标在节点的下侧（节点以外的区域）
					newP[i] = fromTopMidShadowPoint;
					i++;
					if (x >= fromX && x <= fromRightX) {
						newP[i] = fromLeftTopShadowPoint;
						i++;
						if (y > fromBottomY && y <= fromBottomShadowY) {
							// 鼠标在下侧阴影内
							newP[i] = {x : fromLeftShadowX, y : y};
							i++;
						} else {
							// 鼠标在下侧阴影以下
							newP[i] = fromLeftBottomShadowPoint;
							i++;
							newP[i] = {x : x, y : fromBottomShadowY};
							i++;
						}
					} else {
						newP[i] = {x : x, y : fromTopShadowY};
						i++;
					}
					newP[i] = endPoint;
				}
				break;
		}
		return newP;
	}
	
	L.calculateLineWithToNode = function(line, node, x, y) {
		var toNode = node.position;
		var fromNode = line.model.sourceNode.position;
		var startPoint = line.startDot();
		
		var endPoint = L.calculateQuadrant(toNode, x, y);
		if (!endPoint) {
			return null;
		}
		var newP = calculateLine(fromNode, toNode, startPoint, endPoint);
		return newP;
	}
	
	L.calculateLineWithNode = function(line, nodeModel) {
		var fromNodeModel = line.model.sourceNode, toNodeModel = line.model.targetNode;
		var fromNode = fromNodeModel.position, toNode = toNodeModel.position;
		var startPoint = line.startDot(), endPoint = line.endDot();
		if (line.useAuto() != "N") {
			return calculateLine(fromNode, toNode, startPoint, endPoint);
		}
		var newP = line.pointList;
		if (nodeModel.id == fromNodeModel.model.id) {
			var fromX = fromNode.x, fromY = fromNode.y, 
				fromWidth = fromNode.width, fromHeight = fromNode.height;
			var fromMidX = fromX + fromWidth/2, fromRightX = fromX + fromWidth, 
				fromMidY = fromY + fromHeight/2, fromBottomY = fromY + fromHeight;
			switch(startPoint.direction) {
				case "right" : 
					newP[0] = {x : fromRightX, y : fromMidY, direction : "right"};
					break;
				case "bottom" : 
					newP[0] = {x : fromMidX, y : fromBottomY, direction : "bottom"};
					break;
				case "left" : 
					newP[0] = {x : fromX, y : fromMidY, direction : "left"};
					break;
				case "top" : 
					newP[0] = {x : fromMidX, y : fromY, direction : "top"};
					break;
			}
		}
		if (nodeModel.id == toNodeModel.model.id) {
			var toX = toNode.x, toY = toNode.y, 
				toWidth = toNode.width, toHeight = toNode.height;
			var toMidX = toX + toWidth/2, toRightX = toX + toWidth, 
				toMidY = toY + toHeight/2, toBottomY = toY + toHeight;
			var m = line.dotNum - 1;
			switch(endPoint.direction) {
				case "right" : 
					newP[m] = {x : toRightX, y : toMidY, direction : "right"};
					break;
				case "bottom" : 
					newP[m] = {x : toMidX, y : toBottomY, direction : "bottom"};
					break;
				case "left" : 
					newP[m] = {x : toX, y : toMidY, direction : "left"};
					break;
				case "top" : 
					newP[m] = {x : toMidX, y : toY, direction : "top"};
					break;
			}
		}
		return newP;
	}
	
	function calculateLine(fromNode, toNode, startPoint, endPoint) {
		var fromX = fromNode.x, fromY = fromNode.y, 
			fromWidth = fromNode.width, fromHeight = fromNode.height;
		var fromMidX = fromX + fromWidth/2, fromRightX = fromX + fromWidth, 
			fromMidY = fromY + fromHeight/2, fromBottomY = fromY + fromHeight;
		var fromShadowWidth = WFGraph.turnSetting()[0], fromShadowHeight = WFGraph.turnSetting()[1];
		
		var fromLeftShadowX = fromX - fromShadowWidth, 
			fromRightShadowX = fromRightX + fromShadowWidth, 
			fromTopShadowY = fromY - fromShadowHeight, 
			fromBottomShadowY = fromBottomY + fromShadowHeight;
		var fromLeftTopShadowPoint = {x : fromLeftShadowX, y : fromTopShadowY},
			fromLeftMidShadowPoint = {x : fromLeftShadowX, y : fromMidY},
			fromLeftBottomShadowPoint = {x : fromLeftShadowX, y : fromBottomShadowY},
			fromRightTopShadowPoint = {x : fromRightShadowX, y : fromTopShadowY},
			fromRightMidShadowPoint = {x : fromRightShadowX, y : fromMidY},
			fromRightBottomShadowPoint = {x : fromRightShadowX, y : fromBottomShadowY},
			fromTopMidShadowPoint = {x : fromMidX, y : fromTopShadowY},
			fromBottomMidShadowPoint = {x : fromMidX, y : fromBottomShadowY};

		var toX = toNode.x, toY = toNode.y, 
			toWidth = toNode.width, toHeight = toNode.height;
		var toMidX = toX + toWidth/2, toRightX = toX + toWidth, 
			toMidY = toY + toHeight/2, toBottomY = toY + toHeight;
		var toShadowWidth = WFGraph.turnSetting()[0], toShadowHeight = WFGraph.turnSetting()[1];

		var toLeftShadowX = toX - toShadowWidth, 
			toRightShadowX = toRightX + toShadowWidth, 
			toTopShadowY = toY - toShadowHeight, 
			toBottomShadowY = toBottomY + toShadowHeight;
		
		var leftX = toRightX < fromLeftShadowX ? fromLeftShadowX : (toRightX + (fromX - toRightX)/2);
		var rightX = toX > fromRightShadowX ? fromRightShadowX : (fromRightX + (toX - fromRightX)/2);
		var topY = toBottomY < fromTopShadowY ? fromTopShadowY : (toBottomY + (fromY - toBottomY)/2);
		var bottomY = toY > fromBottomShadowY ? fromBottomShadowY : (fromBottomY + (toY - fromBottomY)/2);
		
		var rightShadowX = fromRightShadowX >= toRightShadowX ? fromRightShadowX : toRightShadowX;
		var leftShadowX = fromLeftShadowX >= toLeftShadowX ? toLeftShadowX : fromLeftShadowX;
		var topShadowY = fromTopShadowY >= toTopShadowY ? toTopShadowY : fromTopShadowY;
		var bottomShadowY = fromBottomShadowY >= toBottomShadowY ? fromBottomShadowY : toBottomShadowY;
		
		var newP = {};
		var i = 0;
		
		switch(startPoint.direction) {
			case "right" : 
				newP[i] = {x : fromRightX, y : fromMidY, direction : "right"};
				break;
			case "bottom" : 
				newP[i] = {x : fromMidX, y : fromBottomY, direction : "bottom"};
				break;
			case "left" : 
				newP[i] = {x : fromX, y : fromMidY, direction : "left"};
				break;
			case "top" : 
				newP[i] = {x : fromMidX, y : fromY, direction : "top"};
				break;
		}
		i++;
		switch(startPoint.direction) {
			case "left" : 
				if (toRightX < fromX) {
					var fromLeftMidPoint = {x : leftX, y : fromMidY};
					if (toBottomY < fromMidY) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromLeftMidPoint;
								i++;
								newP[i] = {x : leftX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toMidX, y : fromMidY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : toLeftShadowX, y : fromMidY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = fromLeftMidPoint;
								i++;
								newP[i] = {x : leftX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toY > fromMidY){
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromLeftMidPoint;
								i++;
								newP[i] = {x : leftX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromLeftMidPoint;
								i++;
								newP[i] = {x : leftX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" :  
								newP[i] = {x : toLeftShadowX, y : fromMidY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" :   
								newP[i] = {x : toMidX, y : fromMidY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								if (toMidY != fromMidY) {
									newP[i] = fromLeftMidPoint;
									i++;
									newP[i] = {x : leftX, y : toMidY};
									i++;
								}
								break;
							case "bottom" : 
								newP[i] = fromLeftMidPoint;
								i++;
								newP[i] = {x : leftX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = fromLeftMidPoint;
								i++;
								newP[i] = {x : leftX, y : toTopShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = fromLeftMidPoint;
								i++;
								newP[i] = {x : leftX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					}
				} else {
					newP[i] = fromLeftMidShadowPoint;
					i++;
					if (toBottomY < fromY) {
						var fromLeftTopPoint = {x : fromLeftShadowX, y : topY};
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromLeftTopPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : topY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromLeftTopPoint;
								i++;
								newP[i] = {x : toMidX, y : topY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromLeftShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toY > fromBottomY){
						var fromLeftBottomPoint = {x : fromLeftShadowX, y : bottomY};
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromLeftBottomPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : bottomY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : fromLeftShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = fromLeftBottomPoint;
								i++;
								newP[i] = {x : toMidX, y : bottomY};
								i++;
								break;
						}
					} else if (toMidY >= fromY && toMidY <= fromBottomY) {
						var fromRightTopPoint = {x : rightX, y : fromTopShadowY};
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromLeftShadowX, y : topShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : topShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : fromLeftShadowX, y : bottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : bottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = fromLeftTopShadowPoint;
								i++;
								newP[i] = fromRightTopPoint;
								i++;
								newP[i] = {x : rightX, y : toMidY}
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromLeftShadowX, y : topShadowY};
								i++;
								newP[i] = {x : toMidX, y : topShadowY};
								i++;
								break;
						}
					} else if (toMidY < fromY && toBottomY > fromY) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromLeftShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromLeftBottomShadowPoint;
								i++;
								newP[i] = {x : toMidX, y : fromBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromLeftShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromLeftBottomShadowPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromLeftBottomShadowPoint;
								i++;
								newP[i] = {x : toMidX, y : fromBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromLeftShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : fromTopShadowY};
								i++;
								break;
						}
					}
				}
				break;
			case "right" : 
				if (toX > fromRightX) {
					var fromRightMidPoint = {x : rightX, y : fromMidY};
					if (toBottomY < fromMidY) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : toRightShadowX, y : fromMidY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toMidX, y : fromMidY};
								i++;
								break;
							case "left" : 
								newP[i] = fromRightMidPoint;
								i++;
								newP[i] = {x : rightX, y : toMidY};
								i++;
								break;
							case "top" :  
								newP[i] = fromRightMidPoint;
								i++;
								newP[i] = {x : rightX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toY > fromMidY) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : toRightShadowX, y : fromMidY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromRightMidPoint;
								i++;
								newP[i] = {x : rightX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" :  
								newP[i] = fromRightMidPoint;
								i++;
								newP[i] = {x : rightX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : toMidX, y : fromMidY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromRightMidPoint;
								i++;
								newP[i] = {x : rightX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromRightMidPoint;
								i++;
								newP[i] = {x : rightX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								if (toMidY != fromMidY) {
									newP[i] = fromRightMidPoint;
									i++;
									newP[i] = {x : rightX, y : toMidY};
									i++;
								}
								break;
							case "top" : 
								newP[i] = fromRightMidPoint;
								i++;
								newP[i] = {x : rightX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					}
				} else {
					newP[i] = fromRightMidShadowPoint;
					i++;
					if (toBottomY < fromY) {
						var fromRightTopPoint = {x : fromRightShadowX, y : topY};
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromRightTopPoint;
								i++;
								newP[i] = {x : toMidX, y : topY};
								i++;
								break;
							case "left" : 
								newP[i] = fromRightTopPoint;
								i++;
								newP[i] = {x : toLeftShadowX, y : topY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromRightShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toY > fromBottomY) {
						var fromRightBottomPoint = {x : fromRightShadowX, y : bottomY};
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : fromRightShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = fromRightBottomPoint;
								i++;
								newP[i] = {x : toLeftShadowX, y : bottomY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = fromRightBottomPoint;
								i++;
								newP[i] = {x : toMidX, y : bottomY};
								i++;
								break;
						}
					} else if (toMidY >= fromY && toMidY <= fromBottomY) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromRightBottomShadowPoint;
								i++;
								newP[i] = {x : leftX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : leftX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : fromRightShadowX, y : bottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : bottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromRightShadowX, y : bottomShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : bottomShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromRightShadowX, y : topShadowY};
								i++;
								newP[i] = {x : toMidX, y : topShadowY};
								i++;
								break;
						}
					} else if (toMidY > fromBottomY && toY < fromBottomY) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : fromRightShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromRightShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = fromRightTopShadowPoint;
								i++;
								newP[i] = {x : toMidX, y : fromTopShadowY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromRightBottomShadowPoint;
								i++;
								newP[i] = {x : toMidX, y : fromBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromRightShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromRightShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					}
				}
				break;
			case "bottom" : 
				if (toY > fromBottomY) {
					var bottomMidPoint = {x : fromMidX, y : bottomY};
					if (toRightX < fromMidX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromMidX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : fromMidX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = bottomMidPoint;
								i++;
								newP[i] = {x : toLeftShadowX, y : bottomY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = bottomMidPoint;
								i++;
								newP[i] = {x : toMidX, y : bottomY};
								i++;
								break;
						}
					} else if (toX > fromMidX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = bottomMidPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : bottomY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : fromMidX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromMidX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = bottomMidPoint;
								i++;
								newP[i] = {x : toMidX, y : bottomY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = bottomMidPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : bottomY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = bottomMidPoint;
								i++;
								newP[i] = {x : toLeftShadowX, y : bottomY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = bottomMidPoint;
								i++;
								newP[i] = {x : toLeftShadowX, y : bottomY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								if (toMidX != fromMidX) {
									newP[i] = bottomMidPoint;
									i++;
									newP[i] = {x : toMidX, y : bottomY};
									i++;
								}
								break;
						}
					}
				} else {
					newP[i] = fromBottomMidShadowPoint;
					i++;
					if (toRightX < fromX) {
						var brX = toRightX < fromLeftShadowX ? fromLeftShadowX : (toRightX + fromX)/2;
						var bY = toBottomY < fromBottomShadowY ? fromBottomShadowY : toBottomShadowY;
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : brX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : brX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toMidX, y : fromBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : toLeftShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : brX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : brX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toX > fromRightX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : toRightShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toMidX, y : fromBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : rightX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : rightX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : rightX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : rightX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toMidX >= fromX && toMidX <= fromRightX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : rightShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : rightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromLeftBottomShadowPoint;
								i++;
								newP[i] = {x : fromLeftShadowX, y : topY};
								i++;
								newP[i] = {x : toMidX, y : topY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : leftShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : leftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : leftShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : leftShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toMidX < fromX && toRightX > fromX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromRightBottomShadowPoint;
								i++;
								newP[i] = {x : fromRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toMidX, y : fromBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : toLeftShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : toLeftShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : toRightShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toMidX, y : fromBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = fromLeftBottomShadowPoint;
								i++;
								newP[i] = {x : fromLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : toRightShadowX, y : fromBottomShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					}
				}
				break;
			case "top" : 
				if (toBottomY < fromY) {
					var fromTopMidPoint = {x : fromMidX, y : topY};
					if (toRightX < fromMidX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : fromMidX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromTopMidPoint;
								i++;
								newP[i] = {x : toMidX, y : topY};
								i++;
								break;
							case "left" : 
								newP[i] = fromTopMidPoint;
								i++;
								newP[i] = {x : toLeftShadowX, y : topY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromMidX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else if (toX > fromMidX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromTopMidPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : topY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = fromTopMidPoint;
								i++;
								newP[i] = {x : toMidX, y : topY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromMidX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : fromMidX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromTopMidPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : topY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								if (toMidX != fromMidX) {
									newP[i] = fromTopMidPoint;
									i++;
									newP[i] = {x : toMidX, y : topY};
									i++;
								}
								break;
							case "left" : 
								newP[i] = fromTopMidPoint;
								i++;
								newP[i] = {x : toLeftShadowX, y : topY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = fromTopMidPoint;
								i++;
								newP[i] = {x : toRightShadowX, y : topY};
								i++;
								newP[i] = {x : toRightShadowX, y : toTopShadowY};
								i++;
								newP[i] = {x : toMidX, y : toTopShadowY};
								i++;
								break;
						}
					}
				} else {
					newP[i] = fromTopMidShadowPoint;
					i++;
					if (toRightX < fromX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : leftX, y : fromTopShadowY};
								i++;
								newP[i] = {x : leftX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : leftX, y : fromTopShadowY};
								i++;
								newP[i] = {x : leftX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : toLeftShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : toMidX, y : fromTopShadowY};
								i++;
								break;
						}
					} else if (toX > fromRightX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : toRightShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : rightX, y : fromTopShadowY};
								i++;
								newP[i] = {x : rightX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : rightX, y : fromTopShadowY};
								i++;
								newP[i] = {x : rightX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : toMidX, y : fromTopShadowY};
								i++;
								break;
						}
					} else if (toMidX >= fromX && toMidX <= fromRightX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : rightShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : rightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : leftShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : leftShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : leftShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : leftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = fromRightTopShadowPoint;
								i++;
								newP[i] = {x : fromRightShadowX, y : bottomY};
								i++;
								newP[i] = {x : toMidX, y : bottomY};
								i++;
								break;
						}
					} else if (toMidX < fromX && toRightX > fromX) {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = fromRightTopShadowPoint;
								i++;
								newP[i] = {x : fromRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toLeftShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : toLeftShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : toLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : toMidX, y : fromTopShadowY};
								i++;
								break;
						}
					} else {
						switch(endPoint.direction) {
							case "right" : 
								newP[i] = {x : toRightShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toMidY};
								i++;
								break;
							case "bottom" : 
								newP[i] = {x : toRightShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : toRightShadowX, y : toBottomShadowY};
								i++;
								newP[i] = {x : toMidX, y : toBottomShadowY};
								i++;
								break;
							case "left" : 
								newP[i] = {x : fromLeftShadowX, y : fromTopShadowY};
								i++;
								newP[i] = {x : fromLeftShadowX, y : toMidY};
								i++;
								break;
							case "top" : 
								newP[i] = {x : toMidX, y : fromTopShadowY};
								i++;
								break;
						}
					}
				}
				break;
		}
		// 结束点
		switch(endPoint.direction) {
			case "right" : 
				newP[i] = {x : toRightX, y : toMidY, direction : "right"};
				break;
			case "bottom" : 
				newP[i] = {x : toMidX, y : toBottomY, direction : "bottom"};
				break;
			case "left" : 
				newP[i] = {x : toX, y : toMidY, direction : "left"};
				break;
			case "top" : 
				newP[i] = {x : toMidX, y : toY, direction : "top"};
				break;
		}
		return newP;
	}
	
	L.calculateLineWhenMoveEndpoints = function(line, selectedNode, x, y, isMoveStartPoint) {
		var newP;
		var selectedNodeBBox = selectedNode.position;
		var selectedPoint = L.calculateQuadrant(selectedNodeBBox, x, y);
		if (selectedPoint) {
			if (isMoveStartPoint) {
				var toNode = line.model.targetNode.position;
				var endPoint = line.endDot();
				if (!endPoint.direction) {
					endPoint = L.calculateQuadrant(toNode, endPoint.x, endPoint.y);
				}
				line.model.sourceNode = selectedNode;
				newP = calculateLine(selectedNodeBBox, toNode, selectedPoint, endPoint);
			} else {
				var fromNode = line.model.sourceNode.position;
				var startPoint = line.startDot();
				if (!startPoint.direction) {
					startPoint = L.calculateQuadrant(fromNode, startPoint.x, startPoint.y);
				}
				line.model.targetNode = selectedNode;
				newP = calculateLine(fromNode, selectedNodeBBox, startPoint, selectedPoint);
			}
		}
		return newP;
	}
	
	L.calculateStraightLineWhenMoveEndpoints = function(line, selectedNode, x, y, isMoveStartPoint) {
		var newP = line.pointList;
		var selectedNodeBBox = selectedNode.position;
		var selectedPoint = L.calculateQuadrant(selectedNodeBBox, x, y);
		if (selectedPoint) {
			if (isMoveStartPoint) {
				line.model.sourceNode = selectedNode;
				newP[0] = selectedPoint;
			} else {
				line.model.targetNode = selectedNode;
				newP[line.dotNum - 1] = selectedPoint;
			}
		}
		return newP;
	}
	
	L.calculateStraightLineWithMouse = function(data) {
		// 源节点
		var fromPoint = calculateStraightLinePoint(data.fromPos, data.fromType, data.mousePos);
		return [fromPoint, data.mousePos];
	}
	
	L.calculateStraightLineWithToNode = function(data) {
		return calculateStraightLine(data.fromPos, data.fromType, data.toPos, data.toType);
	}
	
	L.calculateStraightLineWithNode = function(data, isMoveFromNode) {
		var line=data.line, fromPos=data.fromPos, toPos=data.toPos, fromType=data.fromType,toType=data.toType;
		if (line.useAuto() != "N") {
			return calculateStraightLine(fromPos, fromType, toPos, toType);
		}
		var m = line.dotNum - 1;
		var newP = line.pointList;
		if (isMoveFromNode == true) {
			var nextPos = line.pointList[1];
			newP[0] = calculateStraightLinePoint(fromPos, fromType, {x : nextPos.x, y : nextPos.y});
		} else {
			var beforePos = line.pointList[m-1];
			newP[m] = calculateStraightLinePoint(toPos, toType, {x : beforePos.x, y : beforePos.y});
		}
		return newP;
	}
	
	function calculateStraightLine(fromPos, fromType, toPos, toType) {
		// 源节点
		var fromPoint = calculateStraightLinePoint(fromPos, fromType, 
				{x : toPos.x + toPos.width/2, y : toPos.y + toPos.height/2});
		// 目标节点
		var toPoint = calculateStraightLinePoint(toPos, toType,
				{x : fromPos.x + fromPos.width/2, y : fromPos.y + fromPos.height/2});
		return [fromPoint, toPoint];
	}
	
	function calculateStraightLinePoint(fromPos, fromType, refPos) {
		var newPoint;
		switch(fromType) {
			case "startEvent":
			case "endEvent" : 
			case "intermediateCatchEvent":
				newPoint = calculateStraightLinePointForCircle(fromPos, refPos);
				break;
			case "inclusiveGateway": 
			case "exclusiveGateway":
			case "parallelGateway":
			case "complexGateway":
				newPoint = calculateStraightLinePointForRhombus(fromPos, refPos);
				break;
			default :
				newPoint = calculateStraightLinePointForRect(fromPos, refPos);
				break;
		}
		return newPoint;
	}
	
	function calculateStraightLinePointForCircle(fromPos, refPos) {
		// 已知圆心坐标(x1,y1),半径r,圆外一点(x2,y2),求该点到圆心的线段与圆的交点坐标
		var r = fromPos.width/2;
		// 圆外的点和圆中心形成的线段的两个端点
		var p2 = {x : refPos.x, y : refPos.y}, p1 = {x : fromPos.x + r, y : fromPos.y + r};
		var line1_k,line1_b;
		if (p1.x == p2.x) {
			line1_k = 0;
			line1_b = p1.y;
		} else {
			line1_k = (p2.y-p1.y)/(p2.x-p1.x);
			line1_b = p1.y - line1_k*p1.x;
		}
		var deltX = p2.x - p1.x, deltY = p2.y - p1.y;
		
		// 正切值
		var tanYX = (p1.y - p2.y)/(p1.x - p2.x);
		// 中点在同一垂直线上
		tanYX = isNaN(tanYX) ? 0 : tanYX;
		// 绝对值
		var absYX = Math.abs(tanYX);
		// 参考点在节点的左侧：true，右侧：false
		var f = p2.x < p1.x ? -1 : 1;
		//参考点在节点的上方：true，下方：false
		var h = p2.y < p1.y ? -1 : 1;
		var newX, newY;
		
		if (absYX > 1) {
			var A = (deltX * deltX)/(deltY * deltY);
			var R = Math.sqrt((r * r)/(1+A));
			newY = p1.y + h*R;
			if (line1_k == 0) {
				newX = p1.x;
			} else {
				newX = (newY - line1_b)/line1_k;
			}
		} else {
			if (line1_k == 0) {
				if (p1.x == p2.x) {
					newX = p1.x;
					newY = line1_b + r*h;
				}
				if (p1.y == p2.y) {
					newX = p1.x+r*f;
					newY = p1.y;
				}
			} else {
				var B = (deltY * deltY)/(deltX * deltX);
				var BR = Math.sqrt((r * r)/(1+B));
				newX = p1.x + f*BR;
				newY = line1_b + newX*line1_k;
			}
		}
		
		return {x:newX, y:newY};
	}
	
	function calculateStraightLinePointForRhombus(fromPos, refPos) {
		var fromX = fromPos.x, fromY = fromPos.y, fromW = fromPos.width, fromH = fromPos.height;
		var halfW = fromPos.width/2, halfH = fromPos.height/2;
		var fromRightX = fromX + fromW, fromBottomY = fromY + fromH;
		var fromCenterX = fromX + halfW, fromCenterY = fromY + halfH;
		
		var x = refPos.x, y = refPos.y;
		// 菱形外的点和菱形中心形成的线段的两个端点
		var p1 = {x : x, y : y}, p2 = {x : fromCenterX, y : fromCenterY};
		// 菱形边的两个端点
		var edge1, edge2;
		if (y < fromCenterY) {
			if (x >= fromCenterX) {// 右上
				edge1 = {x : fromCenterX, y : fromY};
				edge2 = {x : fromRightX, y : fromCenterY};
			} else {// 左上
				edge1 = {x : fromCenterX, y : fromY};
				edge2 = {x : fromX, y : fromCenterY};
			}
		} else {
			if (x >= fromCenterX) {// 右下
				edge1 = {x : fromRightX, y : fromCenterY};
				edge2 = {x : fromCenterX, y : fromBottomY};
			} else {// 左下
				edge1 = {x : fromX, y : fromCenterY};
				edge2 = {x : fromCenterX, y : fromBottomY};
			}
		}
		
		var line1_k,line1_b,line2_k,line2_b;
		if (p1.x == p2.x) {
			line1_k = 0;
			line1_b = p1.y;
		} else {
			line1_k = (p2.y-p1.y)/(p2.x-p1.x);
			line1_b = p1.y - line1_k*p1.x;
		}
		line2_k = (edge2.y-edge1.y)/(edge2.x-edge1.x);
		line2_b = edge1.y - line2_k*edge1.x;
		// 参考点在节点的左侧：true，右侧：false
		var f = p1.x < p2.x ? -1 : 1;
		//参考点在节点的上方：true，下方：false
		var h = p1.y < p2.y ? -1 : 1;
		var newX,newY;
		if (line1_k == 0 ) {
			if (p1.x == p2.x) {
				newX = p2.x;
				newY = p2.y + halfH*h;
			}
			if (p1.y == p2.y) {
				newX = p2.x+halfW*f;
				newY = p2.y;
			}
		} else {
			newX = (line2_b-line1_b)/(line1_k-line2_k);
			newY = line1_k*newX+line1_b;
		}
		return {x : newX, y : newY};
	}
	
	function calculateStraightLinePointForRect(fromPos, refPos) {
		var halfW = fromPos.width/2, halfH = fromPos.height/2;
		var fromCenterX = fromPos.x + halfW;
		var fromCenterY = fromPos.y + halfH;
		// 正切值
		var tanYX = (fromCenterY - refPos.y)/(fromCenterX - refPos.x);
		// 中点在同一垂直线上
		tanYX = isNaN(tanYX) ? 0 : tanYX;
		// 绝对值
		var absYX = Math.abs(tanYX);
		
		// 参考点在节点的左侧：true，右侧：false
		var f = refPos.x < fromCenterX ? -1 : 1;
		//参考点在节点的上方：true，下方：false
		var h = refPos.y < fromCenterY ? -1 : 1;
		var k = fromPos.height/fromPos.width;
		var newX, newY;
		
		if (absYX > k) {
			if (h == -1) {
				newX = fromCenterX - halfH/tanYX;
				newY = fromCenterY - halfH;
			} else {
				newX = fromCenterX + halfH/tanYX;
				newY = fromCenterY + halfH;
			}
		} else {
			if (f == -1) {
				newX = fromCenterX - halfW;
				newY = fromCenterY - halfW * tanYX;
			} else {
				newX = fromCenterX + halfW;
				newY = fromCenterY + halfW * tanYX;
			}
		}
		return {x : newX, y : newY};
	}

	
	WFGraph.lineUtil = L;
})(jQuery);