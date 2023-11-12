// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payment_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaymentParams _$PaymentParamsFromJson(Map<String, dynamic> json) =>
    PaymentParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      order: json['order'] as int?,
      membership: json['membership'] as int?,
      cost: json['cost'] as int?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$PaymentParamsToJson(PaymentParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'order': instance.order,
      'membership': instance.membership,
      'cost': instance.cost,
      'date': instance.date,
    };
