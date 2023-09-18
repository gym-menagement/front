import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class HighLightedText extends StatelessWidget {
  final String data;
  final Color color;
  final double fontSize;

  const HighLightedText({
    super.key,
    required this.data,
    required this.color,
    required this.fontSize,
  });

  Size getTextSize({
    required String text,
    required TextStyle style,
    required BuildContext context,
  }) {
    final Size size = (TextPainter(
      text: TextSpan(text: text, style: style),
      maxLines: 1,
      textScaleFactor: MediaQuery.of(context).textScaleFactor,
      textDirection: TextDirection.ltr,
    )..layout())
        .size;
    return size;
  }

  @override
  Widget build(BuildContext context) {
    final TextStyle textStyle = TextStyle(
      fontSize: fontSize,
      color: GREY_900_COLOR,
      fontWeight: FontWeight.bold,
    );
    final Size textSize = getTextSize(
      text: data,
      style: textStyle,
      context: context,
    );
    return Stack(
      children: [
        Positioned(
          top: textSize.height / 2,
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(2),
              color: color.withOpacity(1),
            ),
            height: textSize.height / 3 * 2,
            width: textSize.width + 30,
          ),
        ),
        Text(data, style: textStyle),
      ],
    );
  }
}
