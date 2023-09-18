import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class MembershipListCard extends StatelessWidget {
  final Image image;
  final String name;
  final String day;
  final String endDay;

  const MembershipListCard({
    super.key,
    required this.image,
    required this.name,
    required this.day,
    required this.endDay,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Expanded(
          child: Container(
            decoration: const BoxDecoration(
              color: GREY_50_COLOR,
              borderRadius: BorderRadius.all(
                Radius.circular(8.0),
              ),
            ),
            child: Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 8.0, vertical: 12.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  SizedBox(
                      child: Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(16.0),
                        child: image,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        name,
                        style: const TextStyle(
                          color: GREY_700_COLOR,
                          fontSize: 14.0,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        day,
                        style: const TextStyle(
                          fontSize: 12.0,
                          fontWeight: FontWeight.w500,
                          color: GREY_500_COLOR,
                        ),
                      ),
                    ],
                  )),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        endDay,
                        style: const TextStyle(
                          fontSize: 12.0,
                          fontWeight: FontWeight.w500,
                          color: SUB01_COLOR,
                        ),
                      ),
                      Container(
                        width: 3,
                        height: 3,
                        decoration: const ShapeDecoration(
                          color: Color(0xFFFF63CE),
                          shape: OvalBorder(),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
