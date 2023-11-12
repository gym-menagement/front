// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'paymentform_params.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PaymentformParams _$PaymentformParamsFromJson(Map<String, dynamic> json) =>
    PaymentformParams(
      id: json['id'] as int?,
      gym: json['gym'] as int?,
      payment: json['payment'] as int?,
      type: json['type'] as int?,
      cost: json['cost'] as int?,
      date: json['date'] as String?,
    );

Map<String, dynamic> _$PaymentformParamsToJson(PaymentformParams instance) =>
    <String, dynamic>{
      'id': instance.id,
      'gym': instance.gym,
      'payment': instance.payment,
      'type': instance.type,
      'cost': instance.cost,
      'date': instance.date,
    };
