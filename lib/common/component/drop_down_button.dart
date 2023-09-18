// import 'package:flutter/material.dart';
// import 'package:gym/common/const/colors.dart';

// const List<String> list = <String>['One', 'Two', 'Three', 'Four'];

// class DropdownButtonExample extends StatefulWidget {
//   const DropdownButtonExample({super.key});

//   @override
//   State<DropdownButtonExample> createState() => _DropdownButtonExampleState();
// }

// class _DropdownButtonExampleState extends State<DropdownButtonExample> {
//   String? dropdownValue;

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
//       decoration: BoxDecoration(
//         borderRadius: BorderRadius.circular(4),
//         border: Border.all(
//           color: GREY_400_COLOR,
//         ),
//       ),
//       child: DropdownButtonHideUnderline(
//         child: DropdownButton<String>(
//           value: dropdownValue,
//           icon: const Icon(Icons.arrow_drop_down),
//           isExpanded: true,
//           hint: const Text(
//             "담당직원",
//             style: TextStyle(color: GREY_400_COLOR),
//           ),
//           // style: const TextStyle(),
//           onChanged: (String? value) {
//             // This is called when the user selects an item.
//             setState(() {
//               dropdownValue = value!;
//             });
//           },
//           items: list.map<DropdownMenuItem<String>>((String value) {
//             return DropdownMenuItem<String>(
//               value: value,
//               child: Text(value),
//             );
//           }).toList(),
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/const/colors.dart';

class DropdownButtonExample extends StatefulWidget {
  const DropdownButtonExample({Key? key}) : super(key: key);

  @override
  State<DropdownButtonExample> createState() => _CustomDropdownPageState();
}

class _CustomDropdownPageState extends State<DropdownButtonExample> {
  // 드롭다운 리스트.
  static const List<String> _dropdownList = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five'
  ];

  // 선택값.
  String? _dropdownValue;

  // 드롭박스.
  OverlayEntry? _overlayEntry;
  final LayerLink _layerLink = LayerLink();
  static const double _dropdownWidth = 200;
  static const double _dropdownHeight = 48;
  bool dropDown = false;

  // 드롭다운 생성.
  void _createOverlay() {
    if (_overlayEntry == null) {
      _overlayEntry = _customDropdown();
      Overlay.of(context).insert(_overlayEntry!);
      dropDown = true;
      print(dropDown);
    }
  }

  // 드롭다운 해제.
  void _removeOverlay() {
    _overlayEntry?.remove();
    _overlayEntry = null;
    dropDown = false;
    print(dropDown);
  }

  @override
  void dispose() {
    _overlayEntry?.dispose();
    super.dispose();
  }

  final GlobalKey _dropDownButton = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: InkWell(
        onTap: () {
          _createOverlay();
        },
        child: CompositedTransformTarget(
          link: _layerLink,
          child: Container(
            key: _dropDownButton,
            // width: _dropdownWidth,
            height: _dropdownHeight,
            padding: const EdgeInsets.symmetric(horizontal: 7),
            decoration: BoxDecoration(
              border: Border.all(
                color: Colors.grey,
              ),
              borderRadius: dropDown
                  ? const BorderRadius.vertical(
                      top: Radius.circular(4),
                    )
                  : BorderRadius.circular(4),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // 선택값.
                Text(
                  _dropdownValue ?? 'name',
                  style: TextStyle(
                    color: _dropdownValue != null
                        ? GREY_900_COLOR
                        : GREY_400_COLOR,
                    fontSize: 12,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                SvgPicture.asset("asset/svg/icon/select.svg"),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // 드롭다운.
  OverlayEntry _customDropdown() {
    final dropDownButton = _getSize(_dropDownButton);

    return OverlayEntry(
      maintainState: true,
      builder: (context) => Positioned(
        width: dropDownButton.width,
        child: CompositedTransformFollower(
          link: _layerLink,
          offset: const Offset(0, _dropdownHeight),
          child: Container(
            // height: (22.0 * _dropdownList.length) +
            //     (21 * (_dropdownList.length - 1)) +
            //     20,
            height: 156,
            padding: const EdgeInsets.all(7.0),
            decoration: const BoxDecoration(
              color: WHITE_COLOR,
              // border: Border.all(color: Colors.grey),
              // border: BorderDirectional(
              //   start: BorderSide(color: GREY_300_COLOR),
              //   end: BorderSide(color: GREY_300_COLOR),
              //   bottom: BorderSide(color: GREY_300_COLOR),
              // ),
              // borderRadius: BorderRadius.circular(4),
              borderRadius: BorderRadius.vertical(
                bottom: Radius.circular(4),
              ),
            ),
            child: ListView.separated(
              physics: const ClampingScrollPhysics(),
              padding: const EdgeInsets.symmetric(vertical: 6),
              itemCount: _dropdownList.length,
              itemBuilder: (context, index) {
                return CupertinoButton(
                  padding: const EdgeInsets.symmetric(horizontal: 0),
                  pressedOpacity: 1,
                  minSize: 0,
                  onPressed: () {
                    setState(() {
                      _dropdownValue = _dropdownList.elementAt(index);
                    });
                    _removeOverlay();
                  },
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      _dropdownList.elementAt(index),
                      style: const TextStyle(
                        color: GREY_700_COLOR,
                        fontSize: 12,
                        fontFamily: 'Noto Sans KR',
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                );
              },
              separatorBuilder: (context, index) {
                return const Divider(
                  height: 12,
                  color: Colors.grey,
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}

_getSize(GlobalKey key) {
  if (key.currentContext != null) {
    final RenderBox renderBox =
        key.currentContext!.findRenderObject() as RenderBox;
    Size size = renderBox.size;
    return size;
  }
}
