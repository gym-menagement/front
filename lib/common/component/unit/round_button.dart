import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class RoundButton extends StatelessWidget {
  final Color colors;
  final Color borderColor;
  final Color textColor;
  final double fontSize;
  final double horizontal;
  final double vertical;
  final FontWeight fontWeight;
  final String name;
  final double borderWidth;
  final VoidCallback? clickFunc;

  const RoundButton({
    super.key,
    this.colors = WHITE_COLOR,
    required this.borderColor,
    this.textColor = WHITE_COLOR,
    this.fontSize = 14,
    this.horizontal = 16,
    this.vertical = 4,
    this.fontWeight = FontWeight.w500,
    required this.name,
    this.borderWidth = 1.0,
    this.clickFunc,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: clickFunc,
      child: Container(
        padding:
            EdgeInsets.symmetric(horizontal: horizontal, vertical: vertical),
        decoration: ShapeDecoration(
          color: colors,
          shape: RoundedRectangleBorder(
            side: BorderSide(
              width: borderWidth,
              color: borderColor,
            ),
            borderRadius: BorderRadius.circular(100),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              name,
              style: TextStyle(
                color: textColor,
                fontSize: fontSize,
                fontWeight: fontWeight,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
