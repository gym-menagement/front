// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payment_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaymentModel _$PaymentModelFromJson(Map<String, dynamic> json) => PaymentModel(
      id: json['id'] as int,
      gym: json['gym'] as int,
      order: json['order'] as int,
      membership: json['membership'] as int,
      cost: json['cost'] as int,
      date: json['date'] as String,
    );

Map<String, dynamic> _$PaymentModelToJson(PaymentModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'order': instance.order,
      'membership': instance.membership,
      'cost': instance.cost,
      'date': instance.date,
    };
