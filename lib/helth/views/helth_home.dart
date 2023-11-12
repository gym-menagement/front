import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gym/common/component/dialog/action_action.dart';
import 'package:gym/common/component/dialog/action_content.dart';
import 'package:gym/common/component/dialog/action_dialog.dart';
import 'package:gym/common/component/main/home_top.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/helth/component/helth_card.dart';
import 'package:gym/helth/modal/add_helth.dart';
import 'package:gym/provider/helth_provider.dart';
import 'package:gym/provider/helthcategory_provider.dart';

class HelthHome extends ConsumerStatefulWidget {
  const HelthHome({super.key});

  @override
  ConsumerState<HelthHome> createState() => _HelthHomeState();
}

class _HelthHomeState extends ConsumerState<HelthHome> {
  @override
  Widget build(BuildContext context) {
    final state = ref.watch(helthProvider);
    final helthcategory = ref.watch(helthcategoryProvider);

    return Container(
      color: WHITE_COLOR,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          HomeTop(
            title: 'Membership',
            subTitle: '회원권 관리',
            // searchFunc: () {},
            buttonName: "+ 회원권 등록",
            buttonFunc: () {
              ActionDialog(
                context,
                const ActionContent(
                  sizedBoxWidth: 340,
                  sizedBoxHeight: 500,
                  child: AddHelth(),
                ),
                ActionAction(
                  nextFunc: () {},
                ),
              );
            },
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                for (int i = 0; i < helthcategory.length; i++)
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        helthcategory[i].name,
                        style: const TextStyle(
                          color: GREY_900_COLOR,
                          fontSize: 20,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(
                        height: 16,
                      ),
                      Wrap(
                        spacing: 16,
                        runSpacing: 16,
                        children: [
                          for (int j = 0; j < state.length; j++)
                            if (state[j].category == helthcategory[i].id)
                              HelthCard(
                                title: state[j].name,
                                discountPer: state[j].discount,
                                cost: state[j].cost,
                                note: state[j].content,
                              ),
                        ],
                      ),
                      const SizedBox(
                        height: 16,
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
