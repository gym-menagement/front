import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class UseContentInfoText extends StatelessWidget {
  final String name;
  final String value;
  final bool? deFont;

  const UseContentInfoText({
    super.key,
    required this.name,
    required this.value,
    this.deFont = false,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        deFont!
            ? Text(
                name,
                style: const TextStyle(
                  color: GREY_500_COLOR,
                  fontSize: 11,
                  fontWeight: FontWeight.w400,
                  height: 0,
                ),
              )
            : Text(
                name,
                style: const TextStyle(
                  color: GREY_500_COLOR,
                  fontSize: 11,
                  fontFamily: 'outfit',
                  fontWeight: FontWeight.w400,
                  height: 0,
                ),
              ),
        const SizedBox(height: 2),
        deFont!
            ? Text(
                value,
                style: const TextStyle(
                  color: GREY_700_COLOR,
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  height: 0,
                ),
              )
            : Text(
                value,
                style: const TextStyle(
                  color: GREY_700_COLOR,
                  fontSize: 12,
                  fontFamily: 'Outfit',
                  fontWeight: FontWeight.w500,
                  height: 0,
                ),
              ),
      ],
    );
  }
}
