import 'package:flutter/material.dart';
import 'package:gym/common/const/colors.dart';

class RockerRoom extends StatelessWidget {
  const RockerRoom({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              PointInfo(
                color: GREY_200_COLOR,
                name: '사용중',
              ),
              SizedBox(width: 12),
              PointInfo(
                color: WHITE_COLOR,
                name: '사용가능',
              ),
              SizedBox(width: 12),
              PointInfo(
                color: PRIMARY_COLOR,
                name: '선택',
              ),
              SizedBox(width: 12),
              PointInfo(
                color: GREY_600_COLOR,
                name: '기간만료',
              ),
            ],
          ),
          SizedBox(height: 12),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "A",
                style: TextStyle(
                  color: BLACK_COLOR,
                  fontSize: 18,
                  fontFamily: 'Outfit',
                  fontWeight: FontWeight.w500,
                  height: 0,
                ),
              ),
              SizedBox(width: 12),
              Expanded(
                child: Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: [
                    Rocker(),
                    Rocker(name: '정정정'),
                    Rocker(),
                    Rocker(name: '정정정'),
                    Rocker(name: '정정정'),
                    Rocker(),
                    Rocker(name: '정정정'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class Rocker extends StatelessWidget {
  final String? name;

  const Rocker({
    super.key,
    this.name,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 74,
      height: 48,
      padding: const EdgeInsets.all(6),
      decoration: ShapeDecoration(
        color: name != null ? GREY_600_COLOR : WHITE_COLOR,
        shape: RoundedRectangleBorder(
          side: BorderSide(
              width: 1, color: name != null ? GREY_600_COLOR : GREY_300_COLOR),
          borderRadius: BorderRadius.circular(2),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          name != null
              ? Text(
                  name!,
                  style: const TextStyle(
                    color: GREY_500_COLOR,
                    fontSize: 11,
                    fontWeight: FontWeight.w400,
                    height: 0,
                  ),
                )
              : const Text(
                  '1',
                  style: TextStyle(
                    color: GREY_600_COLOR,
                    fontSize: 12,
                    fontFamily: 'Outfit',
                    fontWeight: FontWeight.w400,
                    height: 0,
                  ),
                ),
          if (name != null)
            const Text(
              '~2023.12.25',
              style: TextStyle(
                color: GREY_500_COLOR,
                fontSize: 11,
                fontFamily: 'Outfit',
                fontWeight: FontWeight.w400,
                height: 0,
              ),
            ),
        ],
      ),
    );
  }
}

class PointInfo extends StatelessWidget {
  final Color color;
  final String name;

  const PointInfo({
    super.key,
    required this.color,
    required this.name,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 17,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 10,
            height: 10,
            decoration: ShapeDecoration(
              color: color,
              shape: color == WHITE_COLOR
                  ? const OvalBorder(
                      side: BorderSide(
                        width: 1,
                        color: GREY_300_COLOR,
                      ),
                    )
                  : const OvalBorder(),
            ),
          ),
          const SizedBox(width: 4),
          Text(
            name,
            style: const TextStyle(
              color: Color(0xFF616161),
              fontSize: 12,
              fontWeight: FontWeight.w500,
              height: 0,
            ),
          ),
        ],
      ),
    );
  }
}
