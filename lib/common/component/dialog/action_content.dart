import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class ActionContent extends StatelessWidget {
  final double sizedBoxWidth;
  final double sizedBoxHeight;
  final Widget child;

  const ActionContent({
    super.key,
    required this.sizedBoxHeight,
    required this.sizedBoxWidth,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: sizedBoxWidth - 70,
      height: sizedBoxHeight - 40,
      child: Column(
        children: [
          Align(
            alignment: Alignment.topRight,
            child: IconButton(
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints(),
              icon: SvgPicture.asset(
                'asset/svg/icon/x-mark.svg',
                height: 24,
                width: 24,
              ),
              onPressed: () {
                Navigator.of(context).pop(); // 모달 닫기
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(0, 26, 30, 0),
            child: child,
          ),
        ],
      ),
    );
  }
}
