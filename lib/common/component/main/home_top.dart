import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:gym/common/component/unit/round_button.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/user/model/user_me_model.dart';
import 'package:gym/user/model/user_model.dart';
import 'package:gym/user/provider/user_me_provider.dart';

class HomeTop extends ConsumerWidget {
  final String title;
  final String subTitle;
  final VoidCallback? searchFunc;
  final String? buttonName;
  final VoidCallback? buttonFunc;

  const HomeTop({
    super.key,
    required this.title,
    required this.subTitle,
    this.searchFunc,
    this.buttonName,
    this.buttonFunc,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(userMeProvider);

    final user = state as UserModel;

    return SizedBox(
      height: 80,
      width: double.infinity,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 16.0),
        child: Wrap(
          direction: Axis.vertical,
          alignment: WrapAlignment.center,
          runAlignment: WrapAlignment.spaceBetween,
          runSpacing: 32,
          children: [
            Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 36.0,
                    fontFamily: 'Outfit',
                    fontWeight: FontWeight.w500,
                    color: GREY_900_COLOR,
                    height: 0,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  subTitle,
                  style: const TextStyle(
                    fontSize: 16.0,
                    fontFamily: 'Outfit',
                    fontWeight: FontWeight.w500,
                    color: GREY_600_COLOR,
                  ),
                ),
              ],
            ),
            Row(
              children: [
                if (searchFunc != null)
                  SizedBox(
                    width: 200,
                    height: 40,
                    child: TextField(
                      decoration: InputDecoration(
                        border: const OutlineInputBorder(
                          borderSide: BorderSide(
                            width: 1,
                            color: Color(0xFFBDBDBD),
                          ),
                          borderRadius: BorderRadius.all(Radius.circular(100)),
                        ),
                        hintText: "Search Name",
                        hintStyle: const TextStyle(
                          color: GREY_400_COLOR,
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                          // height: 0.11,
                        ),
                        suffixIcon: GestureDetector(
                          child: SvgPicture.asset(
                            'asset/svg/icon/search.svg',
                            color: GREY_500_COLOR,
                            width: 24,
                            height: 24,
                            fit: BoxFit.scaleDown,
                          ),
                          onTap: () {},
                        ),
                      ),
                    ),
                  ),
                if (buttonFunc != null)
                  const SizedBox(
                    width: 8,
                  ),
                if (buttonFunc != null)
                  SizedBox(
                    width: 110,
                    height: 40,
                    child: InkWell(
                      onTap: buttonFunc,
                      child: const RoundButton(
                        borderColor: SUB01_COLOR,
                        borderWidth: 0,
                        colors: SUB01_COLOR,
                        horizontal: 28,
                        vertical: 10,
                        name: "+ 회원등록",
                        fontWeight: FontWeight.w700,
                        fontSize: 12,
                      ),
                    ),
                  ),
                Container(
                  width: 104,
                  height: 40,
                  padding: const EdgeInsets.only(left: 6),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: const ShapeDecoration(
                          image: DecorationImage(
                            image: AssetImage(
                              'asset/img/image/ddeok_bok_gi.jpg',
                            ),
                            fit: BoxFit.cover,
                          ),
                          shape: OvalBorder(),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              user.name,
                              style: const TextStyle(
                                color: GREY_900_COLOR,
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                height: 0,
                              ),
                            ),
                            const Text(
                              'Manager',
                              style: TextStyle(
                                color: GREY_500_COLOR,
                                fontSize: 12,
                                fontFamily: 'Outfit',
                                fontWeight: FontWeight.w400,
                                height: 0,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
